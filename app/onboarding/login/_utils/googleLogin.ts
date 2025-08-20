export async function googleLogin() {
  // TODO: 실제 Google OAuth 로직 넣기
  return new Promise<{ success: boolean }>(resolve => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}
