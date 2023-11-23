import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class ParseOptionalUUIDPipe extends ParseUUIDPipe {
  override transform = async (
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<string | undefined> =>
    typeof value === 'undefined' ? value : super.transform(value, metadata);
}
