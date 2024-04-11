import crypto from "crypto";
// Function to generate SHA256 checksum
export const generateChecksum = (amount, phoneNumber, reference) => {
    const data = `${amount}${phoneNumber}${reference}`;
    const sha256Hash = crypto.createHash("sha256").update(data).digest("hex");
    return sha256Hash;
};
