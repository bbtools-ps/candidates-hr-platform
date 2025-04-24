export type Candidate = {
  name: string | undefined;
  dateOfBirth: string | undefined;
  contactNumber: string | undefined;
  email: string | undefined;
  skills: { id: string; value: string }[] | undefined;
  id: string | undefined;
};
