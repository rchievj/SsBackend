import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const { username, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();
    
    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user._id, username: user.username });
    return { token };
  }
}
