import {
  ArgumentMetadata,
  ParseEnumPipe,
  ParseEnumPipeOptions,
} from '@nestjs/common';

export class ParseOptionalEnumPipe<T = unknown> extends ParseEnumPipe<T> {
  constructor(enumType: T, options?: ParseEnumPipeOptions) {
    super(enumType, options);
  }
  override transform = async (
    value: T,
    metadata: ArgumentMetadata,
  ): Promise<T> =>
    typeof value === 'undefined' ? value : super.transform(value, metadata);
}
