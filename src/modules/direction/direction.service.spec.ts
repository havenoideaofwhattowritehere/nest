import { Test, TestingModule } from "@nestjs/testing";
import { DirectionService } from "./direction.service";
import { Repository } from "typeorm";
import { Direction } from "./entities/direction.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('DirectionService', () => {
    let service: DirectionService;
    let directionRepository: jest.Mocked<Partial<Repository<Direction>>>;

    beforeEach(async () => {
        directionRepository = {
            find: jest.fn().mockResolvedValue([
                { id: '123', name: 'Cursor', description: 'Mobile AI App', employees: [] }
            ]),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DirectionService,
                { provide: getRepositoryToken(Direction), useValue: directionRepository },
            ],
        }).compile();

        service = module.get<DirectionService>(DirectionService);
    });

    it('should return an array of directions', async () => {
        const result = await service.getDirections();

        expect(directionRepository.find).toHaveBeenCalledTimes(1); // Перевірка, що find() викликався
        expect(result).toEqual([
            { id: '123', name: 'Cursor', description: 'Mobile AI App', employees: [] }
        ]);
    });
});
