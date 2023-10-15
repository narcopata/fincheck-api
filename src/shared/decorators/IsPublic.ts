import { SetMetadata } from '@nestjs/common';
import { metadataTokens } from '../metadataTokens';

export const IsPublic = () => SetMetadata(metadataTokens.IS_PUBLIC, true);
