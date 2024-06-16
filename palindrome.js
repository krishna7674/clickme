function longestPalindrome(s) {
    if (s.length < 2) return s;

    let start = 0, maxLength = 1;

    function expandAroundCenter(left, right) {
        while (s[left] === s[right] && left >= 0 && right < s.length) {
            if (right - left + 1 > maxLength) {
                start = left;
                maxLength = right - left + 1;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);        // Odd length palindrome
        expandAroundCenter(i, i + 1);    // Even length palindrome
    }

    return s.substring(start, start + maxLength);
}
