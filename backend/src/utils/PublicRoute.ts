import { SetMetadata } from '@nestjs/common/decorators';
import { IS_PUBLIC_ROUTE } from 'src/auth/constants';

export default () => SetMetadata(IS_PUBLIC_ROUTE, true);
