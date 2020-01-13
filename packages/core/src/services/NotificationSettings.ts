import {
  BaseRequestOptions,
  BaseService,
  PaginatedRequestOptions,
  RequestHelper,
} from '../infrastructure';

type NotificationSettingLevel =
  | 'disabled'
  | 'participating'
  | 'watch'
  | 'global'
  | 'mention'
  | 'custom';

type ProjectOrGroup = { projectId: string | number } | { groupId: string | number } | {};

export class NotificationSettings extends BaseService {
  all({ projectId, groupId, ...options }: ProjectOrGroup & PaginatedRequestOptions = {}) {
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.get(this, `${url}notification_settings`, options);
  }

  edit({
    projectId,
    groupId,
    ...options
  }: { level?: NotificationSettingLevel } & ProjectOrGroup & BaseRequestOptions = {}) {
    let url = '';

    if (projectId) {
      url += `projects/${encodeURIComponent(projectId)}/`;
    } else if (groupId) {
      url += `groups/${encodeURIComponent(groupId)}/`;
    }

    return RequestHelper.put(this, `${url}notification_settings`, options);
  }
}
