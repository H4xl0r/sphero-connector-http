const request = require('supertest');
const { startServer } = require('../src/server');

const connector = {
  connectToy: jest.fn(),
  wake: jest.fn(),
  sleep: jest.fn(),
  setMainLedColor: jest.fn()
};

describe('server', () => {
  beforeEach(() => {
    connector.connectToy.mockReset();
    connector.wake.mockReset();
    connector.sleep.mockReset();
    connector.setMainLedColor.mockReset();
  });

  describe('POST /connect', () => {
    it('calls connector.connectToy', async () => {
      connector.connectToy.mockReturnValue(200);
      const { server, app } = startServer(connector);

      const toyType = 'SpheroMini';
      const toyName = 'SM-1337';

      await request(app).
        post('/connect').
        send({ type: toyType, name: toyName }).
        set('Content-Type', 'application/json');

      expect(connector.connectToy).toHaveBeenCalledTimes(1);
      server.close();
    });

    it('returns status code from connector.wake', async () => {
      connector.connectToy.mockReturnValue(200);
      const { server, app } = startServer(connector);

      const toyType = 'SpheroMini';
      const toyName = 'SM-1337';

      const response = await request(app).
        post('/connect').
        send({ type: toyType, name: toyName }).
        set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      server.close();
    });
  });

  describe('POST /wake', () => {
    it('calls connector.wake', async () => {
      connector.wake.mockReturnValue(200);
      const { server, app } = startServer(connector);

      await request(app).post('/wake');

      expect(connector.wake).toHaveBeenCalledTimes(1);
      server.close();
    });

    it('returns status code from connector.wake', async () => {
      connector.wake.mockReturnValue(200);
      const { server, app } = startServer(connector);
      const response = await request(app).post('/wake');

      expect(response.statusCode).toBe(200);
      server.close();
    });
  });

  describe('POST /sleep', () => {
    it('calls connector.sleep', async () => {
      connector.sleep.mockReturnValue(200);
      const { server, app } = startServer(connector);

      await request(app).post('/sleep');

      expect(connector.sleep).toHaveBeenCalledTimes(1);
      server.close();
    });

    it('returns status code from connector.sleep', async () => {
      connector.sleep.mockReturnValue(200);
      const { server, app } = startServer(connector);
      const response = await request(app).post('/sleep');

      expect(response.statusCode).toBe(200);
      server.close();
    });
  });

  describe('POST /main-led-color/random', () => {
    it('calls connector.setMainLedColor', async () => {
      connector.setMainLedColor.mockReturnValue(200);
      const { server, app } = startServer(connector);

      await request(app).post('/main-led-color/random');

      expect(connector.setMainLedColor).toHaveBeenCalledTimes(1);
      expect(connector.setMainLedColor).toHaveBeenCalledWith(expect.any(String));
      server.close();
    });

    it('returns status code from connector.setMainLedColor', async () => {
      connector.setMainLedColor.mockReturnValue(200);
      const { server, app } = startServer(connector);
      const response = await request(app).post('/main-led-color/random');

      expect(response.statusCode).toBe(200);
      server.close();
    });
  });

  describe('POST /main-led-color/hex', () => {
    it('calls connector.setMainLedColor', async () => {
      connector.setMainLedColor.mockReturnValue(200);
      const { server, app } = startServer(connector);
      const color = '#ACADDB';

      await request(app).
        post('/main-led-color/hex').
        send({ color }).
        set('Content-Type', 'application/json');

      expect(connector.setMainLedColor).toHaveBeenCalledTimes(1);
      expect(connector.setMainLedColor).toHaveBeenCalledWith(color);
      server.close();
    });

    it('returns status code from connector.setMainLedColor', async () => {
      connector.setMainLedColor.mockReturnValue(200);
      const { server, app } = startServer(connector);
      const color = '#ACADDB';
      const response = await request(app).
        post('/main-led-color/hex').
        send({ color }).
        set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      server.close();
    });
  });
});
