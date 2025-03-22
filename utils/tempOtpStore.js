const otpStore = new Map(); // key: email, value: { token, secret, expiresAt }

function setOtp(email, data) {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(email, { ...data, expiresAt });
}

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit string
};

function getOtp(email) {
  const entry = otpStore.get(email);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email);
    return null;
  }

  return entry;
}

function deleteOtp(email) {
  otpStore.delete(email);
}

module.exports = { setOtp, getOtp, deleteOtp, generateOtp };
