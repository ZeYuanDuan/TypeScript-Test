import { ReservationsHandler } from '../../../app/server_app/handlers/ReservationsHandler';
import {
  HTTP_CODES,
  HTTP_METHODS,
} from '../../../app/server_app/model/ServerModel';
import { Reservation } from '../../../app/server_app/model/ReservationModel';

const getRequestBodyMock = jest.fn();

jest.mock('../../../app/server_app/utils/Utils', () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

describe.only('ReservationsHandler test suite', () => {
  let sut: ReservationsHandler;

  const tokenId = 'YOUSHOULDPASS';

  const request = {
    method: undefined,
    headers: {
      authorization: undefined,
    },
    url: undefined,
  };

  const responseMock = {
    statusCode: 0,
    writeHead: jest.fn(),
    write: jest.fn(),
  };

  const authorizerMock = {
    validateToken: jest.fn(),
  };

  const reservationsDataAccessMock = {
    createReservation: jest.fn(),
    getAllReservations: jest.fn(),
    getReservation: jest.fn(),
    updateReservation: jest.fn(),
    deleteReservation: jest.fn(),
  };

  const testReservation: Reservation = {
    id: undefined,
    user: 'user',
    startDate: 'startDate',
    endDate: 'endDate',
    room: 'room',
  };

  const reservationId = 'abc';

  beforeEach(() => {
    sut = new ReservationsHandler(
      request as any,
      responseMock as any,
      authorizerMock as any,
      reservationsDataAccessMock as any,
    );
    request.headers.authorization = tokenId;
    authorizerMock.validateToken.mockResolvedValueOnce(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not return anything if unauthorized', async () => {
    request.headers.authorization = undefined;

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.UNAUTHORIZED);
    expect(responseMock.write).toHaveBeenCalledWith(
      JSON.stringify('Unauthorized operation!'),
    );
  });

  it('should do nothing for not supported http methods', async () => {
    request.method = 'SOME-METHOD';

    await sut.handleRequest();

    expect(responseMock.write).not.toBeCalled();
    expect(responseMock.writeHead).not.toBeCalled();
  });

  describe('POST test suite', () => {
    beforeEach(() => {
      request.method = HTTP_METHODS.POST;
    });

    it('should create reservation from valid request', async () => {
      getRequestBodyMock.mockResolvedValueOnce(testReservation);
      reservationsDataAccessMock.createReservation.mockResolvedValueOnce(
        reservationId,
      );

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
      expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
        'Content-Type': 'application/json',
      });
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify({ reservationId }),
      );
    });

    it('should not create reservation from invalid request', async () => {
      getRequestBodyMock.mockResolvedValueOnce({});

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify('Incomplete reservation!'),
      );
    });
  });

  describe('GET test suite', () => {
    beforeEach(() => {
      request.method = HTTP_METHODS.GET;
    });

    it('should return all reservations for /all request', async () => {
      request.url = '/reservations/all';
      reservationsDataAccessMock.getAllReservations.mockResolvedValueOnce([
        testReservation,
      ]);

      await sut.handleRequest();

      expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.OK, {
        'Content-Type': 'application/json',
      });
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify([testReservation]),
      );
    });

    it('should return reservation for existing id', async () => {
      request.url = `/reservations/${reservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(
        testReservation,
      );

      await sut.handleRequest();

      expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.OK, {
        'Content-Type': 'application/json',
      });
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify(testReservation),
      );
    });

    it('should return not found for non existing id', async () => {
      request.url = `/reservations/${reservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(
        undefined,
      );

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify(`Reservation with id ${reservationId} not found`),
      );
    });

    it('should return bad request if no id provided', async () => {
      request.url = `/reservations`;

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify('Please provide an ID!'),
      );
    });
  });

  describe('Put test suite', () => {
    beforeEach(() => {
      request.method = HTTP_METHODS.PUT;
    });

    it('should return not found for non existing id', async () => {
      request.url = `/reservations/${reservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(
        undefined,
      );

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify(`Reservation with id ${reservationId} not found`),
      );
    });

    it('should return bad request if no id provided', async () => {
      request.url = `/reservations`;

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify('Please provide an ID!'),
      );
    });

    it('should return bad request if invalid fields are provided', async () => {
      request.url = `/reservations/${reservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(
        testReservation,
      );
      getRequestBodyMock.mockResolvedValueOnce({
        invalidFiled: 'randomValue',
      });

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify('Please provide valid fields to update!'),
      );
    });

    it('should return bad request if no fields are provided', async () => {
      request.url = `/reservations/${reservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(
        testReservation,
      );
      getRequestBodyMock.mockResolvedValueOnce({});

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify('Please provide valid fields to update!'),
      );
    });

    it('should update reservation with all valid fields provided', async () => {
      request.url = `/reservations/${reservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(
        testReservation,
      );

      const updateReservation = {
        startDate: 'someDate1',
        endDate: 'someDate2',
      };

      getRequestBodyMock.mockResolvedValueOnce(updateReservation);

      await sut.handleRequest();

      expect(
        reservationsDataAccessMock.updateReservation,
      ).toHaveBeenCalledTimes(2);

      expect(reservationsDataAccessMock.updateReservation).toHaveBeenCalledWith(
        reservationId,
        'startDate',
        updateReservation.startDate,
      );

      expect(reservationsDataAccessMock.updateReservation).toHaveBeenCalledWith(
        reservationId,
        'endDate',
        updateReservation.endDate,
      );

      expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.OK, {
        'Content-Type': 'application/json',
      });
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify(
          `Updated ${Object.keys(
            updateReservation,
          )} of reservation ${reservationId}`,
        ),
      );
    });
  });

  describe('Delete test suite', () => {
    beforeEach(() => {
      request.method = HTTP_METHODS.DELETE;
    });

    it('should delete reservation with provided id', async () => {
      request.url = `/reservations/${reservationId}`;

      await sut.handleRequest();

      expect(reservationsDataAccessMock.deleteReservation).toHaveBeenCalledWith(
        reservationId,
      );
      expect(responseMock.statusCode).toBe(HTTP_CODES.OK);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify(`Deleted reservation with id ${reservationId}`),
      );
    });

    it('should return bad request if no id provided', async () => {
      request.url = `/reservations`;

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify('Please provide an ID!'),
      );
    });
  });
});
