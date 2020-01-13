import { Groups } from '../../../dist';

let service: Groups;

beforeEach(() => {
  service = new Groups({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
});

describe('Groups.create', () => {
  it('should create a valid group', async () => {
    const g = await service.create(
      'Group Creation Integration test',
      'group-creation-integration-test',
    );
    expect(g).toBeInstanceOf(Object);
    expect(g.name).toEqual('Group Creation Integration test');
  });
});

describe('Groups.all', () => {
  it('should get a list of all groups', async () => {
    const g = await service.all();
    expect(g).toBeInstanceOf(Array);
  });
});
