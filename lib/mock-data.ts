export type WorkflowStatus = 'COMPLETED' | 'RUNNING' | 'FAILED_WITH_TERMINAL_ERROR' | 'TIMED_OUT';
export type TaskState = 'COMPLETED' | 'IN_PROGRESS' | 'FAILED_RETRYABLE' | 'SKIPPED';
export type TriggerType = 'CHAOS_HARNESS' | 'EVENT_KAFKA' | 'CRON_SCHEDULE' | 'WEBHOOK_API' | 'MANUAL_REPLAY';

export interface AgentThreat {
  id: string;
  name: string;
  codename: string;
  attackVector: string;
  status: 'Attacking' | 'Mitigated' | 'Monitoring' | 'Blocked';
  reqPerSec: number;
  resilienceScore: number;
  conductorResponse: string;
  severity: 'Critical' | 'High' | 'Medium';
  icon: string;
  color: string;
}

export interface DagNode {
  id: string;
  label: string;
  sublabel: string;
  status: 'completed' | 'running' | 'failed' | 'healed';
  latency: string;
  iconType: 'terminal' | 'router' | 'task' | 'shield' | 'database' | 'zap';
  taskType: string;
}

export interface DagEdge {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

export interface TaskStep {
  id: string;
  label: string;
  taskRefName: string;
  taskType: string;
  status: TaskState;
  startTime: string;
  executionTimeMs: number;
  detail: string;
  payloadSnippet?: string;
  nodeType: 'input' | 'router' | 'task' | 'shield' | 'connector';
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  name: string;
  version: number;
  status: WorkflowStatus;
  started: string;
  duration: string;
  trigger: TriggerType;
  correlationId: string;
  agentId?: string;
  resilienceRate: string;
  tasks: TaskStep[];
  dagNodes: DagNode[];
  dagEdges: DagEdge[];
  payload: Record<string, unknown>;
  terminalLogs: string[];
}

export const STRESS_AGENTS: AgentThreat[] = [
  {
    id: 'agent-01',
    name: 'Agent 01: Chaos Worker Killer',
    codename: 'WORKER_CRASH',
    attackVector: 'Worker node termination during active execution',
    status: 'Mitigated',
    reqPerSec: 14200,
    resilienceScore: 100,
    conductorResponse: 'Auto-rerouted in 12ms (Zero state loss)',
    severity: 'Critical',
    icon: 'Zap',
    color: '#EF4444',
  },
  {
    id: 'agent-02',
    name: 'Agent 02: Recursion Loop Bomber',
    codename: 'INFINITE_LOOP',
    attackVector: 'Recursive tool sub-workflows (Depth > 1,000)',
    status: 'Blocked',
    reqPerSec: 28500,
    resilienceScore: 99.9,
    conductorResponse: 'Guard clause halted loop at depth 10',
    severity: 'Critical',
    icon: 'GitBranch',
    color: '#F59E0B',
  },
  {
    id: 'agent-03',
    name: 'Agent 03: Poison Payload Fuzzer',
    codename: 'PAYLOAD_FUZZ',
    attackVector: 'Malformed UTF-8 & 50MB JSON injection',
    status: 'Mitigated',
    reqPerSec: 19800,
    resilienceScore: 100,
    conductorResponse: 'Rejected 4,190 invalid payloads',
    severity: 'High',
    icon: 'ShieldAlert',
    color: '#10B981',
  },
  {
    id: 'agent-04',
    name: 'Agent 04: Rate Limit Storm Surge',
    codename: '50K_SURGE',
    attackVector: '50,000 req/sec burst surge on AI Gateway',
    status: 'Attacking',
    reqPerSec: 51200,
    resilienceScore: 99.8,
    conductorResponse: 'Absorbed 51.2K TPS with 0% drop rate',
    severity: 'Critical',
    icon: 'Activity',
    color: '#3B82F6',
  },
  {
    id: 'agent-05',
    name: 'Agent 05: State Race Condition',
    codename: 'RACE_CONDITION',
    attackVector: '1,000 parallel state mutations on single workflow',
    status: 'Mitigated',
    reqPerSec: 11400,
    resilienceScore: 100,
    conductorResponse: 'Atomic optimistic lock prevented dirty writes',
    severity: 'High',
    icon: 'Database',
    color: '#8B5CF6',
  },
  {
    id: 'agent-06',
    name: 'Agent 06: Latency Delay Sprocket',
    codename: '5000MS_DELAY',
    attackVector: '5,000ms delay injection on 3rd-party APIs',
    status: 'Monitoring',
    reqPerSec: 6400,
    resilienceScore: 99.7,
    conductorResponse: 'Async task polling kept memory flat',
    severity: 'Medium',
    icon: 'Clock',
    color: '#06B6D4',
  },
  {
    id: 'agent-07',
    name: 'Agent 07: Memory Leaker Allocator',
    codename: 'BUFFER_OVERFLOW',
    attackVector: '2GB uncleaned memory buffer allocation',
    status: 'Blocked',
    reqPerSec: 8900,
    resilienceScore: 100,
    conductorResponse: 'Isolated & retried on clean sandbox pod',
    severity: 'High',
    icon: 'Layers',
    color: '#EC4899',
  },
  {
    id: 'agent-08',
    name: 'Agent 08: AWS Region Outage Simulator',
    codename: 'REGION_FAILOVER',
    attackVector: 'AWS us-east-1 partition & cloud outage',
    status: 'Mitigated',
    reqPerSec: 32000,
    resilienceScore: 100,
    conductorResponse: 'Quorum failover shifted to us-west-2 in 40ms',
    severity: 'Critical',
    icon: 'Globe',
    color: '#14B8A6',
  },
];

export const MOCK_RUNS: WorkflowRun[] = [
  {
    id: 'run-8agent-01',
    workflowId: 'wf_harness_stress_8agent_001',
    name: '8-agent-chaos-stress-harness',
    version: 4,
    status: 'RUNNING',
    started: 'Just now (Live Attack)',
    duration: '4.12s',
    trigger: 'CHAOS_HARNESS',
    correlationId: 'corr_viren_proof_01',
    agentId: 'agent-04',
    resilienceRate: '99.98%',
    dagNodes: [
      { id: 'node-1', label: '1. Ingest Surge', sublabel: '50K req/sec burst', status: 'completed', latency: '2ms', iconType: 'terminal', taskType: 'HTTP_INGEST' },
      { id: 'node-2', label: '2. Threat Router', sublabel: 'Vector Classifier', status: 'completed', latency: '4ms', iconType: 'router', taskType: 'DYNAMIC_FORK' },
      { id: 'node-3', label: '3. Queue Engine', sublabel: 'Worker Allocation', status: 'running', latency: '12ms', iconType: 'task', taskType: 'SIMPLE_WORKER' },
      { id: 'node-4', label: '4. Circuit Breaker', sublabel: 'Quarantine & Failover', status: 'healed', latency: '8ms', iconType: 'shield', taskType: 'CIRCUIT_BREAKER' },
      { id: 'node-5', label: '5. Quorum Commit', sublabel: 'Multi-Region Persistence', status: 'running', latency: '18ms', iconType: 'database', taskType: 'EVENT_COMMIT' },
    ],
    dagEdges: [
      { from: 'node-1', to: 'node-2', animated: true },
      { from: 'node-2', to: 'node-3', animated: true },
      { from: 'node-2', to: 'node-4', animated: true },
      { from: 'node-3', to: 'node-5', animated: true },
      { from: 'node-4', to: 'node-5', animated: true },
    ],
    tasks: [
      {
        id: 't-1',
        label: 'Adversarial Request Ingest',
        taskRefName: 'adversarial_ingest',
        taskType: 'HTTP_INGEST',
        status: 'COMPLETED',
        startTime: '18:42:01.002',
        executionTimeMs: 2,
        detail: 'Ingested 50,000 req/sec burst payload into gateway buffer',
        nodeType: 'input',
        payloadSnippet: '{"threat_vector":"RATE_LIMIT_STORM","rate":50000}',
      },
      {
        id: 't-2',
        label: 'Threat Classifier Router',
        taskRefName: 'threat_classifier',
        taskType: 'DYNAMIC_FORK',
        status: 'COMPLETED',
        startTime: '18:42:01.006',
        executionTimeMs: 4,
        detail: 'Dynamic fork spawned 64 parallel tasks across worker pool',
        nodeType: 'router',
        payloadSnippet: '{"route":"/v1/transactions","parallel_workers":64}',
      },
      {
        id: 't-3',
        label: 'Conductor Queue Engine',
        taskRefName: 'queue_worker_exec',
        taskType: 'SIMPLE_WORKER',
        status: 'IN_PROGRESS',
        startTime: '18:42:01.018',
        executionTimeMs: 12,
        detail: 'Buffering burst workload across 64 parallel active workers',
        nodeType: 'task',
        payloadSnippet: '{"active_workers":64,"drop_rate":"0%"}',
      },
      {
        id: 't-4',
        label: 'Circuit Breaker Guard',
        taskRefName: 'circuit_breaker_isolation',
        taskType: 'CIRCUIT_BREAKER',
        status: 'COMPLETED',
        startTime: '18:42:01.026',
        executionTimeMs: 8,
        detail: 'Isolated lagging worker-09 and re-routed 1,200 tasks in 8ms',
        nodeType: 'shield',
        payloadSnippet: '{"isolated_worker":"worker-09","action":"FAILOVER_SUCCESS"}',
      },
      {
        id: 't-5',
        label: 'Multi-Region Persistence',
        taskRefName: 'quorum_persistence',
        taskType: 'EVENT_COMMIT',
        status: 'IN_PROGRESS',
        startTime: '18:42:01.044',
        executionTimeMs: 18,
        detail: 'Persisting execution graph event state to multi-region storage',
        nodeType: 'connector',
        payloadSnippet: '{"db_quorum":"3/3","latency_p99":18.4}',
      },
    ],
    payload: {
      workflow: '8-agent-chaos-stress-harness',
      version: 4,
      status: 'RUNNING',
      harness: {
        active_agents: 8,
        total_injected_threats: 142890,
        mitigated_faults: 142861,
        concurrency_peak: 51200,
        circuit_breaker_trips: 3,
        auto_recovery_time_avg: '12ms'
      },
      conductor_metrics: {
        queue_latency_p99: '18.4ms',
        throughput_tps: 48200,
        worker_pool_health: '100% (64/64 active)'
      }
    },
    terminalLogs: [
      '[INFO 18:42:01.002] ⚡ [HARNESS] Agent-04 (50K_SURGE) initiated rate limit storm attack',
      '[INFO 18:42:01.006] 🛡️ [CONDUCTOR] Gateway rate limiter engaged. 0 requests dropped.',
      '[WARN 18:42:01.018] ⚠️ [WORKER] Worker-09 reported artificial delay injection (480ms).',
      '[SUCCESS 18:42:01.026] ✅ [HEALER] Circuit breaker isolated worker-09. Rerouted 1,200 tasks in 8ms.',
      '[INFO 18:42:01.044] 📊 [TELEMETRY] System health: 99.98% resilience rate under peak 51.2K TPS attack.'
    ]
  },
  {
    id: 'run-onboarding-02',
    workflowId: 'wf_customer_onboarding_enterprise_089',
    name: 'customer-onboarding-enterprise',
    version: 12,
    status: 'COMPLETED',
    started: 'Today, 10:42:18 AM',
    duration: '1.84s',
    trigger: 'WEBHOOK_API',
    correlationId: 'corr_acme_corp_signup_992',
    resilienceRate: '100%',
    dagNodes: [
      { id: 'n1', label: '1. Webhook Ingest', sublabel: 'POST /v1/onboarding', status: 'completed', latency: '1ms', iconType: 'terminal', taskType: 'HTTP_INGEST' },
      { id: 'n2', label: '2. Identity Verification', sublabel: 'Persona KYC Check', status: 'completed', latency: '340ms', iconType: 'shield', taskType: 'THIRD_PARTY_API' },
      { id: 'n3', label: '3. DB Provisioning', sublabel: 'Postgres Account Commit', status: 'completed', latency: '210ms', iconType: 'database', taskType: 'DB_COMMIT' },
      { id: 'n4', label: '4. Welcome Email', sublabel: 'SendGrid Dispatch', status: 'completed', latency: '120ms', iconType: 'zap', taskType: 'EMAIL_DISPATCH' },
    ],
    dagEdges: [
      { from: 'n1', to: 'n2', animated: false },
      { from: 'n2', to: 'n3', animated: false },
      { from: 'n3', to: 'n4', animated: false },
    ],
    tasks: [
      { id: 'st-1', label: 'Webhook Ingest', taskRefName: 'webhook_ingest', taskType: 'HTTP_INGEST', status: 'COMPLETED', startTime: '10:42:18.104', executionTimeMs: 1, detail: 'Webhook POST accepted from app.orkes.io', nodeType: 'input', payloadSnippet: '{"email":"maya.chen@enterprise.com"}' },
      { id: 'st-2', label: 'Identity Verification', taskRefName: 'kyc_verification', taskType: 'THIRD_PARTY_API', status: 'COMPLETED', startTime: '10:42:18.445', executionTimeMs: 340, detail: 'Persona KYC passed with 99.4% confidence score', nodeType: 'shield', payloadSnippet: '{"kycStatus":"VERIFIED"}' },
      { id: 'st-3', label: 'DB Provisioning', taskRefName: 'db_provisioning', taskType: 'DB_COMMIT', status: 'COMPLETED', startTime: '10:42:18.655', executionTimeMs: 210, detail: 'Created enterprise organization record in database', nodeType: 'task', payloadSnippet: '{"accountId":"acct_8f31c"}' },
      { id: 'st-4', label: 'Welcome Email', taskRefName: 'send_welcome_pack', taskType: 'EMAIL_DISPATCH', status: 'COMPLETED', startTime: '10:42:18.775', executionTimeMs: 120, detail: 'Dispatched onboarding welcome pack via SendGrid', nodeType: 'connector', payloadSnippet: '{"msgId":"msg_9921c"}' },
    ],
    payload: {
      email: 'maya.chen@enterprise.com',
      company: 'Acme Enterprise Inc.',
      tier: 'ENTERPRISE_PRO',
      output: { accountId: 'acct_8f31c', kycStatus: 'VERIFIED', emailQueued: true }
    },
    terminalLogs: [
      '[INFO 10:42:18.104] Webhook received from app.orkes.io',
      '[INFO 10:42:18.445] KYC check completed successfully via Persona API',
      '[INFO 10:42:18.655] Database record committed for acct_8f31c',
      '[SUCCESS 10:42:18.775] Workflow execution finished cleanly in 1.84s'
    ]
  },
  {
    id: 'run-fraud-03',
    workflowId: 'wf_fraud_detection_realtime_042',
    name: 'fraud-detection-realtime',
    version: 4,
    status: 'FAILED_WITH_TERMINAL_ERROR',
    started: 'Today, 10:38:07 AM',
    duration: '0.92s',
    trigger: 'EVENT_KAFKA',
    correlationId: 'corr_txn_transfer_72a2b',
    resilienceRate: '98.5%',
    dagNodes: [
      { id: 'fn1', label: '1. Ingest Kafka Stream', sublabel: 'Partition #4 Ingest', status: 'completed', latency: '4ms', iconType: 'terminal', taskType: 'KAFKA_INGEST' },
      { id: 'fn2', label: '2. ML Risk Scoring Engine', sublabel: 'Upstream Model Inference', status: 'failed', latency: '920ms', iconType: 'task', taskType: 'HTTP_SERVICE' },
      { id: 'fn3', label: '3. Fallback Policy Enforcer', sublabel: 'Auto Freeze Account', status: 'healed', latency: '12ms', iconType: 'shield', taskType: 'FALLBACK_HANDLER' },
    ],
    dagEdges: [
      { from: 'fn1', to: 'fn2', animated: false },
      { from: 'fn2', to: 'fn3', animated: true },
    ],
    tasks: [
      { id: 'ft-1', label: 'Ingest Kafka Stream', taskRefName: 'kafka_ingest', taskType: 'KAFKA_INGEST', status: 'COMPLETED', startTime: '10:38:07.440', executionTimeMs: 4, detail: 'Ingested high-value transfer txn_72a2b ($28,400)', nodeType: 'input', payloadSnippet: '{"txn_id":"txn_72a2b","amount":28400}' },
      { id: 'ft-2', label: 'ML Risk Scoring Engine', taskRefName: 'ml_risk_score', taskType: 'HTTP_SERVICE', status: 'FAILED_RETRYABLE', startTime: '10:38:08.364', executionTimeMs: 920, detail: 'Upstream ML service returned 504 Gateway Timeout', nodeType: 'task', payloadSnippet: '{"error":"504 Gateway Timeout"}' },
      { id: 'ft-3', label: 'Fallback Policy Enforcer', taskRefName: 'emergency_freeze', taskType: 'FALLBACK_HANDLER', status: 'COMPLETED', startTime: '10:38:08.376', executionTimeMs: 12, detail: 'Conductor caught failure: Executed account freeze safeguard', nodeType: 'shield', payloadSnippet: '{"freezeAction":"ACCOUNT_FROZEN_SAFEGUARD"}' },
    ],
    payload: {
      transactionId: 'txn_72a2b',
      amount: 28400,
      error: { code: 'UPSTREAM_GATEWAY_TIMEOUT', httpStatus: 504, conductorAction: 'FALLBACK_SUBWORKFLOW_EXECUTED' }
    },
    terminalLogs: [
      '[INFO 10:38:07.440] Ingested transaction stream event txn_72a2b',
      '[ERROR 10:38:08.364] Upstream ML service failed after 920ms timeout',
      '[WARN 10:38:08.376] Conductor circuit breaker activated: Executed fallback sub-workflow',
      '[INFO 10:38:08.380] Incident logged and queued for automatic retry in 30s'
    ]
  }
];

export const TIME_SERIES_TELEMETRY = [
  { time: '18:35', agentLoadTps: 12000, conductorLatency: 1.2, queueDepth: 140, resilienceScore: 99.99 },
  { time: '18:36', agentLoadTps: 18500, conductorLatency: 1.4, queueDepth: 290, resilienceScore: 99.98 },
  { time: '18:37', agentLoadTps: 24000, conductorLatency: 1.8, queueDepth: 480, resilienceScore: 99.97 },
  { time: '18:38', agentLoadTps: 39000, conductorLatency: 2.1, queueDepth: 820, resilienceScore: 99.96 },
  { time: '18:39', agentLoadTps: 51200, conductorLatency: 2.4, queueDepth: 1420, resilienceScore: 99.98 },
  { time: '18:40', agentLoadTps: 44000, conductorLatency: 1.9, queueDepth: 750, resilienceScore: 99.99 },
  { time: '18:41', agentLoadTps: 29000, conductorLatency: 1.5, queueDepth: 340, resilienceScore: 100.00 },
  { time: '18:42', agentLoadTps: 15000, conductorLatency: 1.3, queueDepth: 180, resilienceScore: 100.00 },
];
