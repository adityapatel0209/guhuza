interface UserInfo {
    userId: string;
    username: string;
    // userbio: string;
    // datejoined: Date;
    
    stats: { highestscore: number; numberofattempts: number; overallstars: number };

}

export const userData: UserInfo[] = [
    { userId: "1", username: "alexjoe", stats: { highestscore: 500, numberofattempts: 7, overallstars: 6 } },
    { userId: "2", username: "emily123", stats: { highestscore: 750, numberofattempts: 10, overallstars: 8 } },
    { userId: "3", username: "john_doe", stats: { highestscore: 600, numberofattempts: 5, overallstars: 7 } },
    { userId: "4", username: "mike99", stats: { highestscore: 450, numberofattempts: 6, overallstars: 5 } },
    { userId: "5", username: "sarah_x", stats: { highestscore: 820, numberofattempts: 9, overallstars: 9 } },
    { userId: "6", username: "david56", stats: { highestscore: 390, numberofattempts: 4, overallstars: 4 } },
    { userId: "7", username: "chrisB", stats: { highestscore: 670, numberofattempts: 12, overallstars: 7 } },
    { userId: "8", username: "lauraC", stats: { highestscore: 720, numberofattempts: 8, overallstars: 8 } },
    { userId: "9", username: "tommyV", stats: { highestscore: 590, numberofattempts: 11, overallstars: 6 } },
    { userId: "10", username: "nina88", stats: { highestscore: 480, numberofattempts: 7, overallstars: 5 } },

];
