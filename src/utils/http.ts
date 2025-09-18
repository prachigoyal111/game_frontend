export function getErrorMessage(err: any): string {
  if (err?.response?.data) {
    if (typeof err.response.data === 'string') return err.response.data;
    if (typeof err.response.data?.message === 'string') return err.response.data.message;
  }
  if (typeof err?.message === 'string') return err.message;
  return 'Something went wrong';
}
