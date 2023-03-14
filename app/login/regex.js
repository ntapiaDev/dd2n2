// 3 à 16 caractères
export const USER_REGEX = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9_]{2,15}$/;
// Minimum 8 caractères, 1 lettre min + maj, 1 chiffre et 1 caractère spécial
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
