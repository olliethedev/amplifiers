
import * as z from "zod";

import { Logger } from "@aws-amplify/core";

const logger = new Logger("ValidationHelper->fileSchema");

const MB_IN_BYTES = 1000000;
const MAX_FILE_SIZE = MB_IN_BYTES * 2;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const fileSchema = (picture?: string | null) => {
    const fileSchema = z
        .any({ required_error: "Picture is required" })
        .refine((value: FileList) => {
            return picture !== undefined || (value && value.length === 1);
        }, "Please upload a profile picture")
        .refine((value: FileList) => {
            logger.info(value?.[0]);
            logger.info(value?.[0]?.size);
            return picture !== undefined || value?.[0]?.size < MAX_FILE_SIZE;
        }, "File size must be less than 2MB")
        .refine((files: FileList) => {
            return picture !== undefined || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
        }, "File type is not supported");
    if (picture) {
        return fileSchema.optional();
    } else {
        return fileSchema; //required by default
    }
};