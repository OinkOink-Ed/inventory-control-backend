import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPablic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);