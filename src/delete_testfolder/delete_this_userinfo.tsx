interface UserInfo {
  userId: string;
  username: string;
  userbio: string;
  datejoined: Date;

  tags: string[];
  stats: {
    highestscore: number;
    numberofattempts: number;
    overallstars: number;
    levelIntervalscore: {
      interval1: number;
      interval2: number;
      interval3: number;
      interval4: number;
      interval5: number;
    };
  };
}

export const userData: UserInfo[] = [
  {
    userId: "1",
    username: "alexjoe",
    userbio:
      "Passionate gamer and coder, always looking for the next challenge.",
    datejoined: new Date("2023-05-14"),
    tags: ["gaming", "coding"],
    stats: {
      highestscore: 500,
      numberofattempts: 7,
      overallstars: 5,
      levelIntervalscore: {
        interval1: 100,
        interval2: 120,
        interval3: 90,
        interval4: 110,
        interval5: 80,
      },
    },
  },
  {
    userId: "2",
    username: "emily123",
    userbio: "Tech enthusiast and aspiring developer, loves problem-solving.",
    datejoined: new Date("2022-11-08"),
    tags: ["web development", "technology"],
    stats: {
      highestscore: 750,
      numberofattempts: 10,
      overallstars: 5,
      levelIntervalscore: {
        interval1: 150,
        interval2: 160,
        interval3: 140,
        interval4: 170,
        interval5: 130,
      },
    },
  },
  {
    userId: "3",
    username: "john_doe",
    userbio:
      "Enjoys coding and exploring new tech trends, loves a good challenge.",
    datejoined: new Date("2023-02-21"),
    tags: ["AI", "programming"],
    stats: {
      highestscore: 600,
      numberofattempts: 5,
      overallstars: 4,
      levelIntervalscore: {
        interval1: 120,
        interval2: 130,
        interval3: 110,
        interval4: 140,
        interval5: 100,
      },
    },
  },
  {
    userId: "4",
    username: "mike99",
    userbio: "Casual gamer and part-time blogger, interested in UI/UX design.",
    datejoined: new Date("2021-12-15"),
    tags: ["gaming", "blogging", "UI/UX"],
    stats: {
      highestscore: 450,
      numberofattempts: 6,
      overallstars: 5,
      levelIntervalscore: {
        interval1: 90,
        interval2: 100,
        interval3: 85,
        interval4: 95,
        interval5: 80,
      },
    },
  },
  {
    userId: "5",
    username: "sarah_x",
    userbio: "Loves web development and creating engaging user experiences.",
    datejoined: new Date("2023-07-03"),
    tags: ["web development", "design"],
    stats: {
      highestscore: 820,
      numberofattempts: 9,
      overallstars: 2,
      levelIntervalscore: {
        interval1: 180,
        interval2: 190,
        interval3: 170,
        interval4: 200,
        interval5: 160,
      },
    },
  },
  {
    userId: "6",
    username: "david56",
    userbio: "Cybersecurity enthusiast with a passion for ethical hacking.",
    datejoined: new Date("2022-04-28"),
    tags: ["cybersecurity", "ethical hacking"],
    stats: {
      highestscore: 390,
      numberofattempts: 4,
      overallstars: 1,
      levelIntervalscore: {
        interval1: 80,
        interval2: 90,
        interval3: 75,
        interval4: 85,
        interval5: 70,
      },
    },
  },
  {
    userId: "7",
    username: "chrisB",
    userbio: "Software developer with an interest in AI and machine learning.",
    datejoined: new Date("2021-09-19"),
    tags: ["AI", "machine learning", "software development"],
    stats: {
      highestscore: 670,
      numberofattempts: 12,
      overallstars: 4,
      levelIntervalscore: {
        interval1: 140,
        interval2: 150,
        interval3: 130,
        interval4: 160,
        interval5: 120,
      },
    },
  },
  {
    userId: "8",
    username: "lauraC",
    userbio: "Backend developer who loves database optimization and APIs.",
    datejoined: new Date("2023-03-11"),
    tags: ["backend development", "databases"],
    stats: {
      highestscore: 720,
      numberofattempts: 8,
      overallstars: 3,
      levelIntervalscore: {
        interval1: 160,
        interval2: 170,
        interval3: 150,
        interval4: 180,
        interval5: 140,
      },
    },
  },
  {
    userId: "9",
    username: "tommyV",
    userbio:
      "Aspiring data scientist, passionate about big data and analytics.",
    datejoined: new Date("2022-08-05"),
    tags: ["data science", "big data", "analytics"],
    stats: {
      highestscore: 590,
      numberofattempts: 11,
      overallstars: 2,
      levelIntervalscore: {
        interval1: 110,
        interval2: 120,
        interval3: 100,
        interval4: 130,
        interval5: 90,
      },
    },
  },
  {
    userId: "10",
    username: "nina88",
    userbio: "Creative writer and digital artist exploring game development.",
    datejoined: new Date("2023-01-25"),
    tags: ["writing", "game development", "digital art"],
    stats: {
      highestscore: 480,
      numberofattempts: 7,
      overallstars: 1,
      levelIntervalscore: {
        interval1: 100,
        interval2: 110,
        interval3: 90,
        interval4: 120,
        interval5: 80,
      },
    },
  },
];
