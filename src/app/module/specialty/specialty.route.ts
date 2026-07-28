import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/browser";
//import { SpecialtyController } from "./specialty.controller";

const router = Router();

router.post('/', checkAuth(Role.PATIENT), SpecialtyController.createSpecialty);

router.get('/', SpecialtyController.getAllSpecialties);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), SpecialtyController.deleteSpecialty);

export const SpecialtyRoutes = router;