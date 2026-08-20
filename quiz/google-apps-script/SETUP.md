# Connect the quiz to Google Sheets

This integration records each student's name, student ID or institutional email, score, percentage, and submission time in a Google Sheet. The selected answer letters are sent to the Apps Script only so it can recalculate the score; they are not stored in the sheet.

## One-time setup

1. Create a new Google Sheet. A suitable name is `HCIA AI ML Quiz Results`.
2. In the sheet, open **Extensions > Apps Script**.
3. Delete the example function in `Code.gs` and paste the complete contents of the supplied `Code.gs` file.
4. Save the Apps Script project.
5. Select the `setupSheet` function and click **Run**.
6. Approve the requested permission. A worksheet named `Quiz Results` will be created and formatted.
7. In Apps Script, select **Deploy > New deployment**.
8. Choose **Web app** as the deployment type.
9. Set **Execute as** to **Me**.
10. Under access, select **Anyone** or the broadest option that includes every student who will take the quiz.
11. Click **Deploy** and copy the production URL ending in `/exec`.
12. Open `setup-results.html`, paste the `/exec` URL, and generate the student share link.

Do not use the `/dev` testing URL for students. It is intended for editor testing rather than normal deployment.

## Updating the Apps Script later

After changing `Code.gs`, select **Deploy > Manage deployments**, edit the existing deployment, select a new version, and deploy again. The existing `/exec` URL can normally continue to be used.

## Viewing and exporting results

Open the Google Sheet at any time. Each accepted attempt appears as one row with these columns:

- Server timestamp
- Student name
- Student ID or email
- Score and total
- Percentage
- Correct and incorrect counts
- Quiz version
- Attempt ID
- Client submission time

To obtain an Excel file, use **File > Download > Microsoft Excel (.xlsx)**. CSV is also available from the same menu.

## Duplicate handling

Pressing **Retry submission** does not create a second row for the same attempt. A deliberate retake after reloading the quiz creates a new attempt ID and therefore a new row.

## Important limitation

The Apps Script recalculates the score from the submitted answer letters rather than trusting a browser-provided score. However, the quiz and answer choices still run in the student's browser, so this setup is appropriate for study quizzes and ordinary classroom assessment rather than a high-security examination platform.
