import { IssueStatistics, Projects, Groups } from '../../../dist';

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

  service = new IssueStatistics(config);

  group = await groupService.create({ name: 'IssueStatistics Integration' });
  project = await projectService.create({ name: 'IssueStatistics Integration' });
});

describe('IssueStatistics.all', () => {
  it('should return all the global issue stats', async () => {
    const settings = await service.all();

    expect(settings).toBeObject();
  });

  it('should return all the group issue stats', async () => {
    const settings = await service.all({ groupId: group.id });

    expect(settings).toBeObject();
  });

  it('should return all the project issue stats', async () => {
    const settings = await service.all({ projectId: project.id });

    expect(settings).toBeObject();
  });
});
