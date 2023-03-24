import { Module, OnModuleInit } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule,
    AuthModule
  ],
  exports:[UsersService]
})
export class UsersModule implements  OnModuleInit{
  onModuleInit(): any {
    console.log("UsersModule init");
  }
}
