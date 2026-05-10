import type { Reporter, FullResult, TestCase, TestResult } from '@playwright/test/reporter';

interface SlackBlock {
  type: string;
  text?: { type: string; text: string };
  fields?: Array<{ type: string; text: string }>;
}

class SlackReporter implements Reporter {
  private passed = 0;
  private failed = 0;
  private flaky = 0;
  private skipped = 0;
  private failures: string[] = [];

  onTestEnd(test: TestCase, result: TestResult): void {
    const isFinalAttempt = result.retry === test.retries;
    switch (result.status) {
      case 'passed':
        if (result.retry > 0 && isFinalAttempt) {
          this.flaky++;
        } else if (isFinalAttempt) {
          this.passed++;
        }
        break;
      case 'failed':
      case 'timedOut':
        if (isFinalAttempt) {
          this.failed++;
          this.failures.push(`❌ ${test.parent.title} > ${test.title}`);
        }
        break;
      case 'skipped':
        this.skipped++;
        break;
    }
  }

  async onEnd(result: FullResult): Promise<void> {
    const webhook = process.env.SLACK_WEBHOOK;
    if (!webhook) {
      console.log('[slack-reporter] SLACK_WEBHOOK not set, skipping notification.');
      return;
    }

    const emoji = this.failed === 0 ? '✅' : '🔴';
    const status = this.failed === 0 ? 'PASSED' : 'FAILED';
    const runLink = this.buildGithubRunLink();

    const blocks: SlackBlock[] = [
      {
        type: 'header',
        text: { type: 'plain_text', text: `${emoji} Test Run ${status}` },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Passed:* ${this.passed}` },
          { type: 'mrkdwn', text: `*Failed:* ${this.failed}` },
          { type: 'mrkdwn', text: `*Flaky:* ${this.flaky}` },
          { type: 'mrkdwn', text: `*Skipped:* ${this.skipped}` },
          { type: 'mrkdwn', text: `*Duration:* ${Math.round(result.duration / 1000)}s` },
        ],
      },
    ];

    if (runLink) {
      blocks.push({
        type: 'section',
        text: { type: 'mrkdwn', text: `*Run:* <${runLink}|View on GitHub Actions>` },
      });
    }

    if (this.failures.length > 0) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Failures (first 10):*\n${this.failures.slice(0, 10).join('\n')}`,
        },
      });
    }

    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks }),
      });
    } catch (error) {
      console.error('[slack-reporter] Failed to send notification:', error);
    }
  }

  private buildGithubRunLink(): string | null {
    const { GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env;
    if (!GITHUB_SERVER_URL || !GITHUB_REPOSITORY || !GITHUB_RUN_ID) return null;
    return `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
  }
}

export default SlackReporter;
