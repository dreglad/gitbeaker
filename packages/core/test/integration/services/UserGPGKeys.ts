import { UserGPGKeys } from '../../../dist';

let service: UserGPGKeys;

beforeEach(() => {
  service = new UserGPGKeys({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('UserGPGKeys.add', () => {
  it('should add a new gpg key to the user', async () => {
    const keys = await service.add('key');

    expect(keys).toBeInstanceOf(Array);
    expect(keys[0]).toHaveProperty(['id', 'key', 'created_at']);
  });
});

describe('UserGPGKeys.all', () => {
  it('should get all user gcp keys', async () => {
    const keys = await service.all();

    expect(keys).toBeInstanceOf(Array);
  });
});

describe('UserGPGKeys.show', () => {
  it('should get one user gcp key', async () => {
    const keys = await service.add('key2');
    const key = keys.find(k => k.key === 'key2');

    const keyshow = await service.show(key.id);

    expect(keyshow).toMatchObject(key);
  });
});

describe('UserGPGKeys.remove', () => {
  it('should get one user gcp key', async () => {
    const keys = await service.add('key3');
    const key = keys.find(k => k.key === 'key3');

    await service.remove(key.id);

    await expect(service.show(key.id)).toThrow();
  });
});
