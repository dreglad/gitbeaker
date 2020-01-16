import { ProjectsBundle } from '../../../src';

let project;
let bundle;

beforeAll(async () => {
  bundle = new ProjectsBundle({
    host: process.env.GITLAB_URL,
    token: process.env.PERSONAL_ACCESS_TOKEN,
  });
  project = await bundle.Projects.create({ name: 'ProjectsBundle Integration Test' });
});

describe('ProjectsBundle.Issues.create', () => {
  it('should create a valid issue on a project', async () => {
    const issue = await bundle.Issues.create(project.id, {
      title: 'ProjectsBundle Issue Integration Test',
      description: 'A test issue ensuring a sucessfully create Issue in GitLab',
    });

    expect(issue).toBeInstanceOf(Object);
    expect(issue.title).toBe('ProjectsBundle Issue Integration Test');
  });

  it('should get a valid issue of a project', async () => {
    const issue = await bundle.Issues.all(project.id);

    expect(issue).toBeInstanceOf(Array);
  });
});
