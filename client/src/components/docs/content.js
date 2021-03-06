import React from "react";
export default [
  {
    heading: "General",
    list: [
      <div className="list-item">
        Reddit is a popular social-media / forum with many different subreddits
        (sub-forums). Users start discussions via links or self-texts and can
        rank each other's posts and comments by either 'upvoting' or
        'downvoting'.{" "}
        <span className="bold">Scores on Reddit are known as 'karma'</span>.
      </div>,
      <div className="list-item">
        While Reddit allows us to see the top posts on a subreddit, the top
        comments on a post, and users' individual profiles,{" "}
        <span className="bold">
          it doesn't let us rank the users of a certain subreddit by their total
          karma in that subreddit.
        </span>{" "}
        This is where User Ranker For Reddit comes in!
      </div>,
      <div className="list-item">
        Ranker For Reddit allows us to enter a subreddit and see user rankings
        for that subreddit. We can choose whether we want to rank by post or
        comment karma, and also in what timespan.
      </div>,
      <div className="list-item">
        Post-data searches are calculated by getting the highest-ranking posts
        within the specified timespan (upto a maximum of 1000 posts) and
        tallying up the users, their total karma, and their post counts.
      </div>,
      <div className="list-item">
        Comment-data searches also get the highest ranking posts within the
        timespan, but instead of recording the karma of the actual posts, the
        karma of the parent comments (upto 500) is tallied up,{" "}
        <span className="bold">
          and a recursive function is used to check for replies, and to tally up
          the karma for them.
        </span>
      </div>,
      <div className="list-item">
        Results are presented sorted by 'karma' in descending order by default,
        but can be switched to ascending order. Results can also be sorted by
        'count' data, in any order.
      </div>,
      <div className="list-item">This web app took two weeks to complete.</div>,

      <div className="list-item">The frontend uses React and Redux.</div>,

      <div className="list-item">
        The backend is written in Nodejs using the Express server.
      </div>,

      <div className="list-item">
        The web app uses Mongodb because the data it stores is non-relational.
      </div>
    ]
  },
  {
    heading: "Useage",
    list: [
      <div className="list-item">
        Type in a subreddit name, select a timespan and do either a 'Posts' or
        'Comments' search, and see how users rank in terms of their karma
        (score).
      </div>,

      <div className="list-item">
        If you have never used Reddit before or you have no subreddits in mind,
        you can find one{" "}
        <a
          href="https://www.reddit.com/subreddits"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </div>,
      <div className="list-item">
        <span className="bold">Please ensure subreddit is valid.</span> For this
        to be the case, it must exist, and contain at least one post (which has
        at least one comment if you are doing a comment search).
      </div>,
      <div className="list-item">
        Timespans are the same as the ones normally used to sort a subreddit
        while browsing Reddit.
      </div>,

      <div className="list-item">
        <span className="bold">Note:</span> Using a large timespans like 'year'
        and 'all' will involve going through a LOT of data. It will take a while
        most subreddits. On very active subreddits it may cause the server to
        timeout.
      </div>,

      <div className="list-item">
        <span className="bold">Note:</span> Results with a username of
        '[deleted]' do not represent a single user. Instead they represent the
        total score of all posts/comments which have been deleted (either
        manually by a user or by them deleting their account). An interesting
        correlation is how the bigger the subreddit, the more '[deleted]' posts
        there are!
      </div>
    ]
  },
  {
    heading: "What Went Well",
    list: [
      <div className="list-item">
        Connecting Redux and using the store to add functionality to the web
        app.
      </div>,

      <div className="list-item">
        Using Redux-Form to easily extract and manipulate form data.
      </div>,

      <div className="list-item">
        Creating reuseable react components like /client/src/components/
        {"{"}BlueButton.js, FormField.js, Shell.js{"}"}.
      </div>,

      <div className="list-item">
        Sending emails from the 'Contact' page to my personal gmail account
        using{" "}
        <a
          href="https://www.mailgun.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mailgun
        </a>
        .
      </div>,

      <div className="list-item">
        Using application-only Oauth to get data from the Reddit API. One thing
        that was tricky was getting the server to request a new access if a new
        request came in and the current token had expired (or was about to
        expire). You can see how this was done in /routes/searchRoutes.js.
      </div>,

      <div className="list-item">
        Using recursive functions to get all the data. The Reddit API allows a
        maximum of:{" "}
        <ol>
          <li>1000 posts</li> <li>100 posts per request</li>
        </ol>{" "}
        It would provide an 'after' property with each response. If there was no
        more data to fetch, its value would be 'null'.
      </div>
    ]
  },
  {
    heading: "What Was Difficult",
    list: [
      <div className="list-item">
        Styling. <span className="bold">CSS is not my strong suit.</span> The
        web app is responsive and has a navbar that turns into a dropdown menu
        on smaller devices, but there it one weird thing I don't know how to
        fix. When the on-screen keyboard is being used on a smartphone, sizing
        of buttons and form inputs changes. The reason for this is that I used a
        lot of vh and vw to set sizes. Going forward I will need to use a wider
        range of sizing units.
      </div>,

      <div className="list-item">
        Handling errors properly when the client was waiting for a response.
        This would happen a lot with large amounts of data. If the project was
        strictly Nodejs with no frontend, the errors would be easy to deal with.
        Having a client waiting for a response means all error locations have to
        be properly accounted for, and the client must be sent a response it
        knows how to process.
      </div>
    ]
  }
];
