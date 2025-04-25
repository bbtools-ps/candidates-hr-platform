import { v4 as uuid } from "uuid";

export const DUMMY_CANDIDATES = [
  {
    name: "Maggie Frank",
    dateOfBirth: "1990-03-12",
    contactNumber: "+381662312123",
    email: "maggie.frank@gmail.com",
    skills: [
      { id: uuid(), value: "PHP" },
      { id: uuid(), value: "MySql" },
    ],
    id: "1",
  },
  {
    name: "Ruby Elliott",
    dateOfBirth: "1995-06-18",
    contactNumber: "+381662312123",
    email: "ruby.elliott@gmail.com",
    skills: [
      { id: uuid(), value: "Adobe Photoshop" },
      { id: uuid(), value: "Adobe XD" },
    ],
    id: "2",
  },
  {
    name: "Raphael Ward",
    dateOfBirth: "1989-05-15",
    contactNumber: "+381662312123",
    email: "raphael.ward@gmail.com",
    skills: [{ id: uuid(), value: "Adobe Illustrator" }],
    id: "3",
  },
  {
    name: "Robbie Waters",
    dateOfBirth: "1992-12-31",
    contactNumber: "+381662312123",
    email: "robbie.waters@gmail.com",
    skills: [
      { id: uuid(), value: "HTML" },
      { id: uuid(), value: "CSS" },
    ],
    id: "4",
  },
  {
    name: "Liam Kirk",
    dateOfBirth: "1990-08-07",
    contactNumber: "+381662312123",
    email: "liam.kirk@gmail.com",
    skills: [{ id: uuid(), value: "JavaScript" }],
    id: "5",
  },
  {
    name: "Rob Frank",
    dateOfBirth: "1985-05-19",
    contactNumber: "+381662312123",
    email: "rob.frank@gmail.com",
    skills: [
      { id: uuid(), value: "HTML" },
      { id: uuid(), value: "CSS" },
      { id: uuid(), value: "JavaScript" },
    ],
    id: "6",
  },
];
