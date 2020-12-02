export const query = `
  {
  viewer {
    login
    name
    avatarUrl
    bio
    location
    email
    status {
      emoji
      emojiHTML
      message
    }
    twitterUsername
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(last: 20, privacy: PUBLIC) {
      nodes {
        name
        description
        url
        updatedAt
        languages(first:1) {
          nodes{
            color
            name
          }
        }
      }
    }
    starredRepositories {
      totalCount
    }
  }
}
`;