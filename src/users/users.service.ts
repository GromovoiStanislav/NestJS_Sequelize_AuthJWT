import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}


  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER")
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }


  async getAllUsers() {
    //return await this.userRepository.findAll({ include: { all: true } });
    return await this.userRepository.findAll();
  }


  async getUserById(id: number) {
    return await this.userRepository.findByPk(id , {include: { all: true  }});
  }


  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } });
  }


  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.role);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new NotFoundException('Пользователь или роль не найдены');
  }


  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

}
