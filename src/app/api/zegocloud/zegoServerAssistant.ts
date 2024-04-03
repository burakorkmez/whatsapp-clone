import { createCipheriv } from "crypto";

enum ErrorCode {
	success = 0, // "success"
	appIDInvalid = 1, // "appID invalid"
	userIDInvalid = 3, // "userID invalid"
	secretInvalid = 5, // "secret must be a 32 byte string"
	effectiveTimeInSecondsInvalid = 6, // "effectiveTimeInSeconds invalid"
}

const enum KPrivilegeKey {
	PrivilegeKeyLogin = 1,
	PrivilegeKeyPublish = 2,
}

const enum KPrivilegeVal {
	PrivilegeEnable = 1,
	PrivilegeDisable = 0,
}

interface ErrorInfo {
	errorCode: ErrorCode; // Error code from ErrorCode
	errorMessage: string; // Detailed description of the error code
}

function RndNum(a: number, b: number) {
	// Generate a random number within the range of a to b
	return Math.ceil((a + (b - a)) * Math.random());
}

// Generate a random number within the range of int32
function makeNonce() {
	return RndNum(-2147483648, 2147483647);
}

function makeRandomIv(): string {
	// Generate a random 16-character string
	const str = "0123456789abcdefghijklmnopqrstuvwxyz";
	const result = [];
	for (let i = 0; i < 16; i++) {
		const r = Math.floor(Math.random() * str.length);
		result.push(str.charAt(r));
	}
	return result.join("");
}

// Determine the algorithm based on the length of the key, only supports 16 24 32 bits
function getAlgorithm(keyBase64: string): string {
	const key = Buffer.from(keyBase64);
	switch (key.length) {
		case 16:
			return "aes-128-cbc";
		case 24:
			return "aes-192-cbc";
		case 32:
			return "aes-256-cbc";
	}

	throw new Error("Invalid key length: " + key.length);
}

// AES encryption, using mode: CBC/PKCS5Padding
function aesEncrypt(plainText: string, key: string, iv: string): ArrayBuffer {
	const cipher = createCipheriv(getAlgorithm(key), key, iv);
	cipher.setAutoPadding(true);
	const encrypted = cipher.update(plainText);
	const final = cipher.final();
	const out = Buffer.concat([encrypted, final]);

	return Uint8Array.from(out).buffer;
}

export function generateToken04(
	appId: number,
	userId: string,
	secret: string,
	effectiveTimeInSeconds: number,
	payload?: string
): string {
	if (!appId || typeof appId !== "number") {
		throw {
			errorCode: ErrorCode.appIDInvalid,
			errorMessage: "appID invalid",
		};
	}

	if (!userId || typeof userId !== "string") {
		throw {
			errorCode: ErrorCode.userIDInvalid,
			errorMessage: "userId invalid",
		};
	}

	if (!secret || typeof secret !== "string" || secret.length !== 32) {
		throw {
			errorCode: ErrorCode.secretInvalid,
			errorMessage: "secret must be a 32 byte string",
		};
	}

	if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== "number") {
		throw {
			errorCode: ErrorCode.effectiveTimeInSecondsInvalid,
			errorMessage: "effectiveTimeInSeconds invalid",
		};
	}

	const createTime = Math.floor(new Date().getTime() / 1000);
	const tokenInfo = {
		app_id: appId,
		user_id: userId,
		nonce: makeNonce(),
		ctime: createTime,
		expire: createTime + effectiveTimeInSeconds,
		payload: payload || "",
	};

	// Convert token information to json
	const plaintText = JSON.stringify(tokenInfo);
	console.log("plain text: ", plaintText);

	// A randomly generated 16-byte string used as the AES encryption vector, which is Base64 encoded with the ciphertext to generate the final token
	const iv: string = makeRandomIv();
	console.log("iv", iv);

	// Encrypt
	const encryptBuf = aesEncrypt(plaintText, secret, iv);

	// Token binary splicing: expiration time + Base64(iv length + iv + encrypted information length + encrypted information)
	const [b1, b2, b3] = [new Uint8Array(8), new Uint8Array(2), new Uint8Array(2)];
	new DataView(b1.buffer).setBigInt64(0, BigInt(tokenInfo.expire), false);
	new DataView(b2.buffer).setUint16(0, iv.length, false);
	new DataView(b3.buffer).setUint16(0, encryptBuf.byteLength, false);
	const buf = Buffer.concat([
		Buffer.from(b1),
		Buffer.from(b2),
		Buffer.from(iv),
		Buffer.from(b3),
		Buffer.from(encryptBuf),
	]);
	const dv = new DataView(Uint8Array.from(buf).buffer);
	// Package data
	// console.log('-----------------');
	// console.log('-------getBigInt64----------', dv.getBigInt64(0));
	// console.log('-----------------');
	// console.log('-------getUint16----------', dv.getUint16(8));
	// console.log('-----------------');
	return "04" + Buffer.from(dv.buffer).toString("base64");
}
