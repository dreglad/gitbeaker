import { generateKey } from 'openpgp';
import { UserGPGKeys } from '../../../src';

let service: UserGPGKeys;

beforeEach(() => {
  service = new UserGPGKeys({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('UserGPGKeys.add', () => {
  it('should add a new gpg key to the user', async () => {
    const { publicKeyArmored } = await generateKey({
      userIds: {
        name: 'Adding User',
        email: 'test@test.com',
      },
    });
    const keys = await service.add(publicKeyArmored);

    expect(keys).toBeObject();
    expect(keys).toContainKeys(['id', 'key', 'created_at']);
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
    const { publicKeyArmored } = await generateKey({
      userIds: {
        name: 'Show User',
        email: 'test@test.com',
      },
    });
    const key = await service.add(publicKeyArmored);
    const keyshow = await service.show(key.id);

    expect(keyshow).toMatchObject(key);
  });
});

describe('UserGPGKeys.remove', () => {
  it('should get one user gcp key', async () => {
    const { publicKeyArmored } = await generateKey({
      userIds: {
        name: 'Remove User',
        email: 'test@test.com',
      },
    });
    const key = await service.add(publicKeyArmored);

    const { status } = await service.remove(key.id, { showExpanded: true });

    await expect(status).toBe(204);
  });
});
