import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor ( private authService : AuthService) {}

    @Post('/signup')
    signUp(@Body() signUpdto : signUpDto) {
        return this.authService.signUp(signUpdto);
    }
}
