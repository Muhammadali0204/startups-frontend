import config from "../../config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProjectInterface, ShortProjectInterface } from "../../interfaces/project";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBasePath+"/api",
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token != "") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (body) => ({
        url: "projects/project",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyProjects"]
    }),
    getProject: builder.query<ProjectInterface, string>({
      query: (id) => `projects/project/${id}`,
      keepUnusedDataFor: 600,
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
    }),
    getMyProjects: builder.query<ShortProjectInterface[], void>({
      query: () => 'projects/my-projects',
      keepUnusedDataFor: 600,
      providesTags: ["MyProjects"]
    }),
    getMostViewedProjects: builder.query<ShortProjectInterface[], void>({
      query: () => 'projects/most-viewed',
      keepUnusedDataFor: 600,
    }),
    getMostLikedProjects: builder.query<ShortProjectInterface[], void>({
      query: () => 'projects/most-liked',
      keepUnusedDataFor: 600,
    }),
    setProjectLike: builder.mutation({
      query: (project_id) => ({
        url: `set-project/set-like/${project_id}`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, project_id) => [{ type: "Project", id: project_id }],
    }),
    setProjectShare: builder.mutation({
      query: (project_id) => ({
        url: `set-project/set-share/${project_id}`,
        method: 'POST'
      }),
      invalidatesTags: (_result, _error, project_id) => [{ type: "Project", id: project_id }],
    }),
    deleteMyProject: builder.mutation({
      query: (id) => ({
        url: `/projects/project/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["MyProjects"]
    }),
    updateProject: builder.mutation<{message: string}, {project_id: string | undefined, body: any}>({
      query: ({ project_id, body }) => ({
        url: `/projects/project/${project_id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (_result, _error, args) => [{ type: "Project", id: args.project_id }, 'MyProjects'],
    }),
    searchProject: builder.query<ShortProjectInterface[], string>({
      query: (q) => ({
        url: `projects/search?q=${q}`,
        method: "GET"
      })
    })
  }),
  tagTypes: ["MyProjects", "Project"],
  refetchOnFocus: false,
  refetchOnReconnect: false,
});

export const {
  useCreateProjectMutation,
  useGetProjectQuery,
  useGetMyProjectsQuery,
  useGetMostLikedProjectsQuery,
  useGetMostViewedProjectsQuery,
  useSetProjectLikeMutation,
  useSetProjectShareMutation,
  useDeleteMyProjectMutation,
  useUpdateProjectMutation,
  useSearchProjectQuery
} = projectApi;
