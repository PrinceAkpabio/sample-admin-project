export type UserProfile = {
  id: number;
  index: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  approved: boolean;
  admin: boolean;
  token: string;
  defaultAdmin: boolean;
  adminId: number;
};

export interface UserProfileResponse {
  data: UserProfile;
  support: {
    url: string;
    text: string;
  };
}

export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserProfile[];
  support: {
    url: string;
    text: string;
  };
}

export type UpdateUserProfile = { firstName: string; lastName: string };

export interface UpdateUserProfileResponse {
  name: string;
  job: string;
  updatedAt: string;
}
