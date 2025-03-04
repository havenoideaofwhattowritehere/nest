import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';
import { DirectionModule } from './modules/direction/direction.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeTechnologyModule } from './modules/employee_technologies/employee_technology.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { ProjectHistoryModule } from './modules/project_history/projecthistory.module';
import { ResumeModule } from './modules/resume/resume.module';
import { ResumeVersionModule } from './modules/resume_version/resume_version.module';
import { TechnologyModule } from './modules/technologies/technologies.module';
import { databaseConfig } from './core/database/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    CompanyModule,
    DirectionModule,
    EmployeeModule,
    EmployeeTechnologyModule,
    ExperienceModule,
    ProjectHistoryModule,
    ResumeModule,
    ResumeVersionModule,
    TechnologyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
