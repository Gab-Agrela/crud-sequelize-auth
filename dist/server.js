"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(router);
// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   return res.status(500).json({ message: err.message });
// });
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => res.status(200).json({ message: "aaaa" }));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
exports.default = app;
//# sourceMappingURL=server.js.map