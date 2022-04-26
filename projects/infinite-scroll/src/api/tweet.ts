import request from '@/utils/request';

export function getTweetList(listQuery: { page: number; limit: number }) {
  return request({
    url: '/tweet/list',
    method: 'get',
    params: listQuery,
  });
}
