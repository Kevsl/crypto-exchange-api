import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';

import { OfferDto } from './dto';
import { User } from '@prisma/client';
import { getMockUser } from '../utils/tests/user-mock';
import { JwtGuard } from '../auth/guard';
import { UseGuards } from '@nestjs/common';

describe('OfferController', () => {
  let controller: OfferController;
  let service: OfferService;

  const mockOfferService = {
    getOffers: jest.fn(),
    getOffersByCrypto: jest.fn(),
    createOffer: jest.fn(),
    editOfferById: jest.fn(),
    deleteOfferById: jest.fn(),
  };

  const mockUser: User = getMockUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [
        {
          provide: OfferService,
          useValue: mockOfferService,
        },
      ],
    })
      .overrideGuard(UseGuards(JwtGuard))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<OfferController>(OfferController);
    service = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllOffers', () => {
    it('should return all offers for the user', async () => {
      const mockOffers = [{ id: 1, name: 'Offer 1' }];
      mockOfferService.getOffers.mockResolvedValue(mockOffers);

      const result = await controller.getAllOffers(mockUser);
      expect(result).toEqual(mockOffers);
      expect(service.getOffers).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('getOffersByCryptoId', () => {
    it('should return offers by crypto ID', async () => {
      const mockOffers = [{ id: 1, name: 'Crypto Offer' }];
      const cryptoId = 'crypto-id';
      mockOfferService.getOffersByCrypto.mockResolvedValue(mockOffers);

      const result = await controller.getOffersByCryptoId(mockUser, cryptoId);
      expect(result).toEqual(mockOffers);
      expect(service.getOffersByCrypto).toHaveBeenCalledWith(
        mockUser.id,
        cryptoId,
      );
    });
  });

  describe('createRole', () => {
    it('should create a new offer', async () => {
      const dto: OfferDto = {
        id_crypto: 'AZAAZ',
        amount: 200,
      };
      const mockCreatedOffer = { id: 1, ...dto };
      mockOfferService.createOffer.mockResolvedValue(mockCreatedOffer);

      const result = await controller.createRole(dto, mockUser);
      expect(result).toEqual(mockCreatedOffer);
      expect(service.createOffer).toHaveBeenCalledWith(mockUser.id, dto);
    });
  });

  describe('editOfferById', () => {
    it('should edit an offer by ID', async () => {
      const offerId = 'offer-id';
      const dto: OfferDto = {
        id_crypto: 'AZAAZ',
        amount: 200,
      };
      const mockUpdatedOffer = { id: 1, ...dto };
      mockOfferService.editOfferById.mockResolvedValue(mockUpdatedOffer);

      const result = await controller.editOfferById(offerId, dto, mockUser);
      expect(result).toEqual(mockUpdatedOffer);
      expect(service.editOfferById).toHaveBeenCalledWith(
        mockUser.id,
        offerId,
        dto,
      );
    });
  });

  describe('deleteOfferById', () => {
    it('should delete an offer by ID', async () => {
      const offerId = 'offer-id';
      mockOfferService.deleteOfferById.mockResolvedValue(null);

      const result = await controller.deleteOfferById(offerId, mockUser);
      expect(result).toBeNull();
      expect(service.deleteOfferById).toHaveBeenCalledWith(
        mockUser.id,
        offerId,
      );
    });
  });
});
