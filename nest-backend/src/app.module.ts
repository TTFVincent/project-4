import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { TripsModule } from './models/trips/trips.module';
import { LocationsModule } from './models/locations/locations.module';
import { TripLocationsModule } from './models/trip-locations/trip-locations.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users/entities/user.entity';
import { Trip } from './models/trips/entities/trip.entity';
import { Location } from './models/locations/entities/location.entity';
import { TripLocation } from './models/trip-locations/entities/trip-location.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User, Trip, Location, TripLocation],
      synchronize: false,
    }),
    UsersModule,
    TripsModule,
    LocationsModule,
    TripLocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
