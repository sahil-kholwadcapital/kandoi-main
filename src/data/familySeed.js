// src/data/familySeed.js
// Kandoi–Kholwadwala family tree (latest)
// Shape: { name, notes?, spouses?: string[], children?: Person[] }

/* To add info to side panel, replace with this and fill info:
  {
    
  }
*/
const seed = {
  name: "Devji Kandoi",
  spouses: [
    { name: "Mrs. Kandoi", gender: "female", bio: "Matriarch of the family." }
  ],
  children: [
    {
      name: "Naathu Kandoi",
      spouses: [
        { name: "Mrs. Kandoi", gender: "female" }
      ],
      children: [
        {
          name: "Naran Kandoi",
          spouses: [
            { name: "Mrs. Kandoi", gender: "female" }
          ],
          children: [
            {
              name: "Harjeevan Kandoi",
              spouses: [
                { name: "Raatan", gender: "female" }
              ],
              children: [
                {
                  name: "Vallabh Kandoi",
                  notes: "Mali Bhodanwala",
                  children: [
                    {
                      name: "Thakor Modi",
                      spouses: [
                        { name: "Laxmi Palsanawala", gender: "female" }
                      ],
                      children: [
                        {
                          name: "Kanti Modi",
                          spouses: [
                            { name: "Pushpa Modi", gender: "female" }
                          ],
                          children: [
                            { name: "Kiran", notes: "adopted from brother Dhansuk" },
                          ],
                        },
                        { name: "Kavsalia", notes: "adopted" },
                        {
                          name: "Haskmuk Modi",
                          spouses: [
                            { name: "Bhagwati Vadoliwala", gender: "female" }
                          ],
                          children: [{ name: "Anil Modi" }, { name: "Kishor Modi" }, { name: "Vipin" }],
                        },
                        {
                          name: "Ishwar Modi",
                          spouses: [
                            { name: "Kalawati Modi", gender: "female" }
                          ],
                          children: [
                            {
                              name: "Vesay Modi",
                              spouses: [
                                { name: "Sunal Kapadia", gender: "female" }
                              ],
                              children: [{ name: "Anjali" }, { name: "Kishan" }],
                            },
                            {
                              name: "Versa",
                              spouses: [
                                { name: "Zakesh", gender: "male" }
                              ],
                              children: [{ name: "Raj" }, { name: "Anana" }],
                            },
                            {
                              name: "Amisa",
                              spouses: [
                                { name: "Tejas Ganjawala", gender: "male" }
                              ],
                              children: [{ name: "Hershal" }, { name: "Dhruwa" }],
                            },
                            { name: "Yogesh Modi", spouses: ["Melissa"] },
                          ],
                        },
                        {
                          name: "Champak Modi",
                          spouses: ["Lilawati Modi"],
                          children: [{ name: "Kalpesh" }, { name: "Paneaj" }, { name: "Pratima" }],
                        },
                        {
                          name: "Dhansuk Modi",
                          spouses: ["Urmila Bandanwala"],
                          children: [
                            { name: "Paresh" },
                            { name: "Pyush" },
                            { name: "Kiran", notes: "Given to brother Kranti" },
                          ],
                        },
                      ],
                    },
                    {
                      name: "Vijli Modi",
                      spouses: ["Chiman Geewala"],
                      children: [
                        { name: "Champak" },
                        { name: "Jessi", spouses: ["Thakor Dhamrodwala"] },
                        { name: "Dhansuk" },
                      ],
                    },
                  ],
                },

                { name: "Benki Kandoi", spouses: ["Unknown"] },

                {
                  name: "Jeena Kandoi",
                  spouses: [
                    { name: "Amba Bhodanwala", gender: "female" }
                  ],
                  children: [
                    {
                      name: "Chaagan Kandoi/Kholwad",
                      spouses: ["Mani"],
                      children: [
                        {
                          name: "Hasmukh",
                          spouses: ["Manjula"],
                          children: [
                            {
                              name: "Kishor",
                              spouses: ["Reshma"],
                              children: [
                                { name: "Joy" },
                                {
                                  name: "Nikki",
                                  spouses: ["Manish"],
                                  children: [{ name: "Haley" }],
                                },
                              ],
                            },
                            {
                              name: "Chaaya",
                              spouses: ["Prabodh"],
                              children: [
                                {
                                  name: "Ankur",
                                  spouses: ["Sweta"],
                                  children: [{ name: "Naisha" }],
                                },
                                {
                                  name: "Dipak",
                                  spouses: ["Priti"],
                                  children: [{ name: "Priya" }, { name: "Kishen" }],
                                },
                              ],
                            },
                          ],
                        },
                        { name: "Pushpa", spouses: ["Ishwar"] },
                        {
                          name: "Khushman Kholwadwala",
                          gender: "male",
                          dob: "",
                          focus: "",
                          location: "Surat, India",
                          bio: "",
                          website: "",
                          tile1: { title: "Custom Tile 1", content: "text text text" },
                          tile2: { title: "Custom Tile 2", content: "text text text" },
                          tile3: { title: "Custom Tile 3", content: "text text text" },
                          spouses: [
                            {
                              name: "Rita (Ramila) Mithaiwala",
                              gender: "female",
                              dob: "October 14th",
                              focus: "",
                              location: "Surat India",
                              bio: "",
                              website: "",
                              tile1: { title: "Custom Tile 1", content: "text text text" },
                              tile2: { title: "Custom Tile 2", content: "text text text" },
                              tile3: { title: "Custom Tile 3", content: "text text text" }
                            }
                          ],
                          children: [
                            {
                              name: "Sanjay Kholwadwala",
                              gender: "male",
                              dob: "",
                              focus: "",
                              location: "Surat India",
                              bio: "",
                              website: "",
                              tile1: { title: "Custom Tile 1", content: "text text text" },
                              tile2: { title: "Custom Tile 2", content: "text text text" },
                              tile3: { title: "Custom Tile 3", content: "text text text" },
                              spouses: [
                                {
                                  name: "Binita Nagoria",
                                  gender: "female",
                                  dob: "",
                                  focus: "",
                                  location: "",
                                  bio: "",
                                  website: "",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" }
                                }
                              ],
                              children: [
                                {
                                  name: "Akhil Kholwadwala",
                                  gender: "male",
                                  dob: "April 12th, 2000",
                                  focus: "",
                                  location: "Albuquerque, NM",
                                  bio: "",
                                  website: "",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" }
                                },
                                {
                                  name: "Anokhi Kholwadwala",
                                  gender: "female",
                                  dob: "April 12th, 2000",
                                  focus: "",
                                  location: "Albuquerque, NM",
                                  bio: "",
                                  website: "",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" }
                                }
                              ]
                            },
                            {
                              name: "Manish Kholwadwala",
                              gender: "male",
                              dob: "March 4th 1969",
                              focus: "",
                              location: "Surat India",
                              bio: "",
                              website: "",
                              tile1: { title: "Custom Tile 1", content: "text text text" },
                              tile2: { title: "Custom Tile 2", content: "text text text" },
                              tile3: { title: "Custom Tile 3", content: "text text text" },
                              spouses: [
                                {
                                  name: "Yamini (Meenu) Panwala",
                                  gender: "female",
                                  dob: "",
                                  focus: "",
                                  location: "",
                                  bio: "",
                                  website: "",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" }
                                }
                              ],
                              children: [
                                {
                                  name: "Fenil Kholwadwala",
                                  gender: "male",
                                  dob: "May 30 1991",
                                  focus: "",
                                  location: "",
                                  bio: "",
                                  website: "",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" },
                                  spouses: [
                                    {
                                      name: "Carmen Kakish",
                                      gender: "female",
                                      dob: "",
                                      focus: "",
                                      location: "",
                                      bio: "",
                                      website: "",
                                      tile1: { title: "Custom Tile 1", content: "text text text" },
                                      tile2: { title: "Custom Tile 2", content: "text text text" },
                                      tile3: { title: "Custom Tile 3", content: "text text text" }
                                    }
                                  ],
                                  children: [
                                    {
                                      name: "Arjun Kholwadwala",
                                      gender: "male",
                                      dob: "",
                                      focus: "",
                                      location: "Akron OH",
                                      bio: "",
                                      website: "",
                                      tile1: { title: "Custom Tile 1", content: "text text text" },
                                      tile2: { title: "Custom Tile 2", content: "text text text" },
                                      tile3: { title: "Custom Tile 3", content: "text text text" }
                                    },
                                    {
                                      name: "Omar Kholwadwala",
                                      gender: "male",
                                      dob: "",
                                      focus: "",
                                      location: "Albuquerque NM",
                                      bio: "",
                                      website: "",
                                      tile1: { title: "Custom Tile 1", content: "text text text" },
                                      tile2: { title: "Custom Tile 2", content: "text text text" },
                                      tile3: { title: "Custom Tile 3", content: "text text text" }
                                    }
                                  ]
                                },
                                {
                                  name: "Prachi Kholwadwala",
                                  gender: "female",
                                  dob: "April 16th 1999",
                                  focus: "",
                                  location: "Albuquerque NM",
                                  bio: "",
                                  website: "",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" }
                                }
                              ]
                            },
                            {
                              name: "Deepesh Kholwadwala",
                              gender: "male",
                              dob: "Janurary 3rd 1971",
                              focus: "",
                              location: "Surat India",
                              bio: "",
                              website: "",
                              tile1: { title: "Custom Tile 1", content: "text text text" },
                              tile2: { title: "Custom Tile 2", content: "text text text" },
                              tile3: { title: "Custom Tile 3", content: "text text text" },
                              spouses: [
                                {
                                  name: "Prakruti Athale",
                                  gender: "female",
                                  dob: "June 23 1972",
                                  focus: "",
                                  location: "Ahmedabad India",
                                  bio: "",
                                  website: "",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" }
                                }
                              ],
                              children: [
                                {
                                  name: "Suraj Kholwadwala",
                                  gender: "male",
                                  dob: "Janurary 3rd 2000",
                                  focus: "",
                                  location: "Albuquerque, NM",
                                  bio: "",
                                  website: "",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" }
                                },
                                {
                                  name: "Sahil Kholwadwala",
                                  gender: "male",
                                  dob: "March 30 2002",
                                  focus: "What did you focus on?",
                                  location: "Albuquerque, NM",
                                  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a lacinia orci. Integer lectus elit, pellentesque sit amet dignissim eget, condimentum eu sapien. Nullam malesuada ante et luctus viverra. Nunc lacinia lectus sed nibh dignissim rutrum. Aliquam et tristique libero. Fusce mauris est, semper et dolor in, vulputate condimentum lorem. Donec condimentum malesuada augue, at venenatis sapien vulputate vitae. Integer at eros nisl. Pellentesque quis tellus odio. Pellentesque varius purus sed ligula laoreet pulvinar. Maecenas sed sem ac mi viverra scelerisque quis ac quam.",
                                  website: "https://kholwadcapital.com",
                                  tile1: { title: "Custom Tile 1", content: "text text text" },
                                  tile2: { title: "Custom Tile 2", content: "text text text" },
                                  tile3: { title: "Custom Tile 3", content: "text text text" }
                                }
                              ]
                            }
                          ],
                        },
                        { name: "Chandan", spouses: ["Ramesh"] },
                        {
                          name: "Dinesh",
                          spouses: ["Asha"],
                          children: [
                            {
                              name: "Dhawal Kholwadwala",
                              spouses: ["Gina Patel"],
                              children: [{ name: "Dhavina Kholwadwala" }, { name: "Devin Kholwadwala" }],
                            },
                            {
                              name: "Tina Kholwadwala",
                              spouses: ["Guillermo Hernandez"],
                              children: [{ name: "Liam Hernandez" }, { name: "Ian Hernandez" }],
                            },
                          ],
                        },
                        {
                          name: "Bhupen",
                          spouses: ["Meena"],
                          children: [
                            {
                              name: "Sonal Kholwadwala",
                              spouses: ["Rinav"],
                              children: [{ name: "Riddhi" }],
                            },
                            {
                              name: "Deepa (Bitto) Kholwadwala",
                              spouses: ["Bhavesh"],
                              children: [{ name: "Shivani" }, { name: "Shaan" }],
                            },
                            {
                              name: "Vishal",
                              spouses: ["Megha"],
                              children: [{ name: "Shristi" }, { name: "Samarth" }],
                            },
                          ],
                        },
                        {
                          name: "Champa",
                          spouses: ["Bharat"],
                          children: [
                            {
                              name: "Rupal",
                              spouses: ["Jayesh (Raju)"],
                              children: [
                                {
                                  name: "Ayushi",
                                  spouses: ["Abhshek Shakwala"],
                                  children: [{ name: "Unknown" }],
                                },
                                { name: "Akshi" },
                                { name: "Ashi" },
                              ],
                            },
                            {
                              name: "Reena",
                              spouses: ["Unknown"],
                              children: [
                                { name: "Priya", notes: "previous marriage" },
                                { name: "Riya", notes: "previous marriage" },
                                { name: "Shriya", notes: "previous marriage" },
                              ],
                            },
                            {
                              name: "Santosh Mody",
                              spouses: ["Kushboo (Sachi) Gandhi"],
                              children: [{ name: "Krishang Mody" }, { name: "Dhruv Mody" }],
                            },
                          ],
                        },
                        { name: "Vijree", spouses: ["Chunni"] },
                        {
                          name: "Jakisun",
                          spouses: ["Savita"],
                          children: [{ name: "Neeru" }, { name: "Dharti" }, { name: "Ila" }],
                        },
                        { name: "Shanti", spouses: ["Chartal"] },
                        {
                          name: "Chunni",
                          spouses: ["Chanchar Umberwala"],
                          children: [
                            {
                              name: "Bipin",
                              spouses: ["Yogmi"],
                              children: [{ name: "Joy" }, { name: "Nikki" }, { name: "Hilesh" }],
                            },
                            {
                              name: "Naina",
                              spouses: ["Gancram Bajwala"],
                              children: [{ name: "Sweety" }, { name: "Pratikr" }],
                            },
                            { name: "Chetna" },
                          ],
                        },
                        { name: "Kamri", spouses: ["Nagindas Modi"] },
                        { name: "Bhogi", spouses: ["Raman Palsanwala"] },
                        { name: "Stillborn" },
                        { name: "Kanchan", spouses: ["Amrat"] },
                        { name: "Jenti", spouses: ["Chamlan"] },
                        { name: "Jesse", spouses: ["Kanchan"] },
                        {
                          name: "Uttam",
                          spouses: ["Kundan Hevaliwala"],
                          children: [
                            {
                              name: "Hitesh",
                              spouses: ["Rajvi"],
                              children: [
                                {
                                  name: "Hardik",
                                  spouses: ["Divya"],
                                  children: [{ name: "Shiven" }, { name: "Vihan" }],
                                },
                                {
                                  name: "Pinkal",
                                  spouses: ["Hemanth"],
                                  children: [{ name: "Unknown" }, { name: "Unknown" }],
                                },
                              ],
                            },
                            {
                              name: "Hansa",
                              spouses: ["Dhansukh"],
                              children: [
                                {
                                  name: "Sweety",
                                  spouses: ["Nimish"],
                                  children: [{ name: "Tarjani" }, { name: "Parishi" }],
                                },
                                {
                                  name: "Boskee",
                                  spouses: ["Kimshuk"],
                                  children: [{ name: "Jalanshu" }],
                                },
                                {
                                  name: "Nippun",
                                  spouses: ["Janvi"],
                                  children: [{ name: "Sia" }, { name: "Kush" }],
                                },
                              ],
                            },
                            {
                              name: "Pragna",
                              spouses: ["Bhupen"],
                              children: [
                                {
                                  name: "Nikki",
                                  spouses: ["Ashwin"],
                                  children: [{ name: "Aryan" }, { name: "Dev" }],
                                },
                                {
                                  name: "Bhavisha",
                                  spouses: ["Piyush"],
                                  children: [{ name: "Ria" }],
                                },
                                { name: "Rahul" },
                              ],
                            },
                            { name: "Samir", spouses: ["Radhika"] },
                            { name: "Unknown" },
                            { name: "Unknown" },
                          ],
                        },
                      ],
                    },
                  ],
                },

                {
                  name: "Vithal Kandoi",
                  spouses: ["Devkor"],
                  children: [
                    { name: "Manki", spouses: ["Unknown"] },
                    {
                      name: "Magan Kholwadwala",
                      spouses: ["Chandi"],
                      notes: "(Four children – names TBD)",
                      children: [{ name: "Unknown" }, { name: "Unknown" }, { name: "Unknown" }, { name: "Unknown" }],
                    },
                    {
                      name: "Shanti",
                      spouses: ["Nandlal Bhumiawala"],
                      children: [
                        { name: "Kirit", spouses: ["Raksha"] },
                        {
                          name: "Praful",
                          spouses: ["Usha Vakil"],
                          children: [{ name: "Amee" }, { name: "Seeme" }, { name: "Jaime" }],
                        },
                        {
                          name: "Champak",
                          spouses: ["Shamma Kayti"],
                          children: [{ name: "Nikki", spouses: ["Gutam"] }, { name: "Pooja" }, { name: "Banti" }],
                        },
                      ],
                    },
                    { name: "Laxmi" },
                    { name: "Thakor Kholwadwala", notes: "Married Twice" },
                    {
                      name: "Jesse",
                      spouses: ["Sakbhajiwala"],
                      children: [{ name: "Unknown" }, { name: "Unknown" }, { name: "Unknown" }, { name: "Unknown" }],
                    },
                    {
                      name: "Amba",
                      spouses: ["Panwala"],
                      children: [{ name: "Unknown" }, { name: "Unknown" }, { name: "Unknown" }],
                    },
                    { name: "Chandan", spouses: ["Unknown"] },
                    { name: "Shantilal", spouses: ["Unknown"] },
                  ],
                },

                {
                  name: "Mankor Kandoi",
                  spouses: ["Thakor Bardoliwala"],
                  children: [
                    { name: "Babu" },
                    { name: "Amrit" },
                    { name: "Ramesh" },
                    { name: "Mani", spouses: ["Mumbaiwala"], children: [{ name: "Unknown" }] },
                  ],
                },

                {
                  name: "Laxmi Kandoi",
                  spouses: ["Dayaram Vahanwala"],
                  children: [
                    {
                      name: "Nandu",
                      spouses: ["Bhindawala"],
                      children: [{ name: "Unknown" }, { name: "Unknown" }, { name: "Unknown" }],
                    },
                  ],
                },

                { name: "Daughter" },
                { name: "Daughter" },
                { name: "Daughter" },
                { name: "Daughter" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default seed;
