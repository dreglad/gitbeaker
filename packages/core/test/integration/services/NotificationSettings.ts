import { NotificationSettings, Projects, Groups } from '../../../dist';

const config = {
  host: process.env.GITLAB_URL,
  token: process.env.PERSONAL_ACCESS_TOKEN,
};
let service;
let group;
let project;

beforeAll(async () => {
  const projectService = new Projects(config);
  const groupService = new Groups(config);

  service = new NotificationSettings(config);

  group = await groupService.create({ name: 'Notification Settings Integration' });
  project = await projectService.create({ name: 'Notification Settings Integration' });
});

describe('NotificationSettings.all', () => {
  it('should return all the global notification settings', async () => {
    const settings = await service.all();

    expect(settings).toBeObject();
  });

  it('should return all the group notification settings', async () => {
    const settings = await service.all({ groupId: group.id });

    expect(settings).toBeObject();
  });

  it('should return all the project notification settings', async () => {
    const settings = await service.all({ projectId: project.id });

    expect(settings).toBeObject();
  });
});

describe('NotificationSettings.edit', () => {
  it('should return edit the global notification settings', async () => {
    const settings = await service.edit({ reassignMergeRequest: true });

    expect(settings).toBeObject();
    expect(settings).toContainEntry(['reassign_merge_request', true]);
  });

  it('should return edit the group notification settings', async () => {
    const settings = await service.edit({ groupId: group.id, mergeMergeRequest: true });

    expect(settings).toBeObject();
    expect(settings).toContainEntry(['merge_merge_request', true]);
  });

  it('should return edit the project notification settings', async () => {
    const settings = await service.all({ projectId: project.id, reopenMergeRequest: true });

    expect(settings).toBeObject();
    expect(settings).toContainEntry(['reopen_merge_request', true]);
  });
});
