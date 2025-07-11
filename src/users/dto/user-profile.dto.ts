import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserProfileDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  constructor(partial: Partial<UserProfileDto>) {
    Object.assign(this, partial);
  }
}
