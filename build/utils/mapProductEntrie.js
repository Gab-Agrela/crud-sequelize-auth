"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTypeThree = exports.formatTypeTwo = exports.formatTypeOne = exports.typeOfContent = void 0;
const typeOfContent = (content) => {
    if (Array.isArray(content))
        return 3;
    if ("details" in content)
        return 2;
    return 1;
};
exports.typeOfContent = typeOfContent;
const formatTypeOne = (userId, entry) => {
    const { name, brand, model, price, color } = entry;
    return {
        userId,
        name,
        brand,
        model,
        options: [{ price, color }],
    };
};
exports.formatTypeOne = formatTypeOne;
const formatTypeTwo = (userId, entry) => {
    const { name, price, details: { brand, model, color }, } = entry;
    return {
        userId,
        name,
        brand,
        model,
        options: [
            {
                price,
                color,
            },
        ],
    };
};
exports.formatTypeTwo = formatTypeTwo;
const formatTypeThree = (userId, entry) => {
    return entry.map((product) => {
        const { name, brand, model, data } = product;
        return {
            userId,
            name,
            brand,
            model,
            options: [...data],
        };
    });
};
exports.formatTypeThree = formatTypeThree;
