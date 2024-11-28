import { applyDecorators } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function FileUpload(
  type: 'CSV',
  additionalProperties?: Record<string, SchemaObject | ReferenceObject>,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: `${type} file to upload`,
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
          ...additionalProperties,
        },
      },
    }),
  );
}
