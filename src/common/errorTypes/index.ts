import { ApiProperty } from "@nestjs/swagger";

// Здесь бы ещё разобраться с тем, а как их все типизировать и что у них должно быть через свагер

export class ErrorResponse400 {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    details?: {
        [key: string]: string;
    };
}

export class ErrorResponse408 {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    retryAfter?: number;
    @ApiProperty()
    timestamp?: string;
}

export class ErrorResponse403 {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    requestedPath?: string;
    @ApiProperty()
    permissions?: string[];
    @ApiProperty()
    timestamp?: string;
}

export class ErrorResponse404 {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    message: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    requestedPath?: string;
    @ApiProperty()
    timestamp?: string;
}