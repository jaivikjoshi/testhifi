import React, { useMemo, useState } from "react";

function IconBase({ size = 18, className = "", viewBox = "0 0 24 24", children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Check(props) {
  return <IconBase {...props}><path d="m5 13 4 4L19 7" /></IconBase>;
}
function ChevronRight(props) {
  return <IconBase {...props}><path d="m9 18 6-6-6-6" /></IconBase>;
}
function ArrowLeft(props) {
  return <IconBase {...props}><path d="m15 18-6-6 6-6" /></IconBase>;
}
function Bell(props) {
  return <IconBase {...props}><path d="M6 9a6 6 0 1 1 12 0c0 7 3 6 3 8H3c0-2 3-1 3-8" /><path d="M10 20a2 2 0 0 0 4 0" /></IconBase>;
}
function Calendar(props) {
  return <IconBase {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M3 10h18" /></IconBase>;
}
function CirclePlus(props) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 8v8" /><path d="M8 12h8" /></IconBase>;
}
function ClipboardList(props) {
  return <IconBase {...props}><rect x="6" y="4" width="12" height="16" rx="2" /><path d="M9 4.5h6" /><path d="M9 10h6" /><path d="M9 14h6" /></IconBase>;
}
function Clock(props) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></IconBase>;
}
function Flag(props) {
  return <IconBase {...props}><path d="M5 21V4" /><path d="M5 4h10l-2 3 2 3H5" /></IconBase>;
}
function Home(props) {
  return <IconBase {...props}><path d="M4 11 12 5l8 6" /><path d="M6 10v9h12v-9" /></IconBase>;
}
function LinkIcon(props) {
  return <IconBase {...props}><path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5" /><path d="M14 11a5 5 0 0 0-7.07 0L5.5 12.43a5 5 0 0 0 7.07 7.07L14 19" /></IconBase>;
}
function MoreHorizontal(props) {
  return <IconBase {...props}><path d="M5 12h.01" /><path d="M12 12h.01" /><path d="M19 12h.01" /></IconBase>;
}
function Search(props) {
  return <IconBase {...props}><circle cx="11" cy="11" r="6" /><path d="m20 20-4.2-4.2" /></IconBase>;
}
function ShieldAlert(props) {
  return <IconBase {...props}><path d="M12 3l7 3v5c0 4.5-2.9 8.1-7 10-4.1-1.9-7-5.5-7-10V6l7-3Z" /><path d="M12 8v5" /><path d="M12 16h.01" /></IconBase>;
}
function Shuffle(props) {
  return <IconBase {...props}><path d="M16 3h5v5" /><path d="M4 20 21 3" /><path d="M21 16v5h-5" /><path d="m15 15 6 6" /><path d="m4 4 5 5" /></IconBase>;
}
function Sparkles(props) {
  return <IconBase {...props}><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /><path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" /></IconBase>;
}
function User(props) {
  return <IconBase {...props}><circle cx="12" cy="8" r="4" /><path d="M5 20a7 7 0 0 1 14 0" /></IconBase>;
}
function AlertCircle(props) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16h.01" /></IconBase>;
}
function CheckCircle(props) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></IconBase>;
}
function Layers(props) {
  return <IconBase {...props}><path d="m12 4 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4" /><path d="m4 16 8 4 8-4" /></IconBase>;
}

const palette = {
  bg: "#F4F7FB",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  line: "#E6ECF5",
  navy: "#142640",
  blue: "#3A76F0",
  amber: "#F59E0B",
  red: "#E25555",
  green: "#10B981",
  violet: "#7C3AED",
};

const eventName = "Spring Gala";

const taskState = {
  urgent: [
    {
      id: 1,
      name: "Confirm catering",
      owner: "Unclaimed",
      deadline: "Mar 18",
      status: "Unclaimed",
      urgency: "Due soon",
      note: "Vendor needs final headcount tonight",
    },
    {
      id: 2,
      name: "Book venue",
      owner: "Rakul",
      deadline: "Mar 20",
      status: "In Progress",
      urgency: "Dependency risk",
      note: "Waiting on room approval before poster goes live",
    },
  ],
  blocked: [
    {
      id: 3,
      name: "Design poster",
      owner: "Metro",
      deadline: "Mar 20",
      status: "Blocked",
      urgency: "Blocked by dependency",
      note: "Needs confirmed venue and final budget",
      reason: "Waiting on venue confirmation",
    },
  ],
  reassign: [
    {
      id: 4,
      name: "Social media caption",
      owner: "You",
      deadline: "Mar 19",
      status: "Needs Reassignment",
      urgency: "Needs handoff",
      note: "Draft exists but final sponsor copy is missing",
    },
  ],
  done: [
    {
      id: 5,
      name: "Budget sheet cleanup",
      owner: "Navi",
      deadline: "Mar 16",
      status: "Done",
      urgency: "Completed today",
      note: "Latest costs synced to shared sheet",
    },
  ],
  myTasks: [
    {
      id: 6,
      name: "Book DJ",
      owner: "You",
      deadline: "Mar 19",
      status: "In Progress",
      urgency: "Due soon",
      note: "Need final quote approval",
    },
    {
      id: 7,
      name: "Social media caption",
      owner: "You",
      deadline: "Mar 19",
      status: "Needs Reassignment",
      urgency: "Needs handoff",
      note: "Can’t finish until sponsor logo is sent",
    },
    {
      id: 8,
      name: "Volunteer check-in list",
      owner: "You",
      deadline: "Mar 21",
      status: "In Progress",
      urgency: "Upcoming",
      note: "Half drafted, just needs final names",
    },
  ],
};

const screens = [
  { key: "dashboard", label: "Dashboard" },
  { key: "task-detail", label: "Task detail" },
  { key: "claim", label: "Claim flow" },
  { key: "my-tasks", label: "My tasks" },
  { key: "blocked", label: "Blocked flow" },
  { key: "reassign", label: "Reassign flow" },
  { key: "create", label: "Create task" },
  { key: "success", label: "Confirmation" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Shell({ children, activeTab, onTabChange }) {
  const tabs = [
    { key: "dashboard", icon: Home },
    { key: "my-tasks", icon: ClipboardList },
    { key: "create", icon: CirclePlus },
  ];

  return (
    <div className="relative h-[852px] w-[393px] overflow-hidden rounded-[42px] border border-black/10 bg-white shadow-[0_35px_100px_rgba(15,23,42,0.18)]">
      <div className="absolute inset-0 bg-[#F4F7FB]">{children}</div>
      <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-7 w-36 -translate-x-1/2 rounded-full bg-black" />
      {activeTab && onTabChange ? (
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-[28px] border border-white/80 bg-white/95 p-2 shadow-[0_20px_40px_rgba(15,23,42,0.14)] backdrop-blur">
          <div className="flex items-center justify-between">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={cn(
                    "flex h-12 w-24 items-center justify-center rounded-2xl transition-all",
                    active ? "bg-slate-100 shadow-sm" : "bg-transparent"
                  )}
                >
                  <Icon size={20} className={active ? "text-slate-900" : "text-slate-400"} />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-2 pt-5 text-[13px] font-semibold text-slate-900">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="h-2.5 w-4 rounded-[3px] border border-slate-900/80" />
        <div className="h-2.5 w-2 rounded-full bg-slate-900" />
        <div className="h-2.5 w-2 rounded-full bg-slate-900" />
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-sm" style={{ backgroundColor: palette.navy }}>
        <Layers size={18} />
      </div>
      <div>
        <div className="text-[17px] font-semibold tracking-[-0.03em] text-slate-900">Unfinished</div>
        <div className="text-[11px] text-slate-500">keep incomplete tasks visible</div>
      </div>
    </div>
  );
}

function TopHeader({ title, subtitle, right }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h1 className="text-[30px] font-semibold tracking-[-0.04em] text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-1 text-[14px] leading-6 text-slate-500">{subtitle}</p> : null}
      </div>
      {right}
    </div>
  );
}

function Badge({ tone = "neutral", children }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-600",
    due: "bg-amber-50 text-amber-700",
    blocked: "bg-rose-50 text-rose-700",
    handoff: "bg-violet-50 text-violet-700",
    done: "bg-emerald-50 text-emerald-700",
    active: "bg-blue-50 text-blue-700",
  };
  return <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", tones[tone])}>{children}</span>;
}

function StatePill({ state }) {
  const map = {
    Unclaimed: "bg-slate-100 text-slate-700",
    Claimed: "bg-blue-50 text-blue-700",
    "In Progress": "bg-blue-50 text-blue-700",
    Blocked: "bg-rose-50 text-rose-700",
    "Needs Reassignment": "bg-violet-50 text-violet-700",
    Done: "bg-emerald-50 text-emerald-700",
  };
  return <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", map[state] || map.Unclaimed)}>{state}</span>;
}

function TaskCard({ task, compact = false, onOpen, actions }) {
  const urgencyTone = task.urgency === "Due soon"
    ? "due"
    : task.urgency === "Blocked by dependency"
    ? "blocked"
    : task.urgency === "Needs handoff"
    ? "handoff"
    : task.status === "Done"
    ? "done"
    : "active";

  return (
    <div className="rounded-[26px] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900">{task.name}</div>
          <div className="mt-1 text-[13px] text-slate-500">Owner: {task.owner} • Due {task.deadline}</div>
        </div>
        <button onClick={onOpen} className="rounded-full bg-slate-100 p-2.5 text-slate-500">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatePill state={task.status} />
        <Badge tone={urgencyTone}>{task.urgency}</Badge>
      </div>
      <p className="mt-3 text-[13px] leading-5 text-slate-500">{task.note}</p>
      {compact ? null : actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

function Section({ title, count, action, children }) {
  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">{title}</h2>
          {typeof count === "number" ? <span className="text-[12px] text-slate-400">({count})</span> : null}
        </div>
        {action ? <button className="text-[12px] font-medium text-slate-500">{action}</button> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DashboardScreen({ onOpenScreen, onTabChange }) {
  return (
    <Shell activeTab="dashboard" onTabChange={onTabChange}>
      <StatusBar />
      <div className="h-full overflow-y-auto px-6 pb-28 pt-2">
        <div className="mt-2 flex items-center justify-between">
          <Brand />
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-white p-3 shadow-sm"><Search size={18} className="text-slate-700" /></button>
            <button className="rounded-full bg-white p-3 shadow-sm"><Bell size={18} className="text-slate-700" /></button>
          </div>
        </div>

        <div className="mt-5 rounded-[30px] p-5 text-white shadow-[0_24px_60px_rgba(20,38,64,0.22)]" style={{ backgroundColor: palette.navy }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[12px] uppercase tracking-[0.18em] text-white/55">Event</div>
              <div className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">{eventName}</div>
            </div>
            <div className="rounded-[18px] bg-white/10 px-3 py-2 text-[12px] text-white/75">48 hours out</div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-[22px] bg-white/8 p-3">
              <div className="text-[11px] text-white/52">Urgent</div>
              <div className="mt-1 text-[24px] font-semibold">2</div>
            </div>
            <div className="rounded-[22px] bg-white/8 p-3">
              <div className="text-[11px] text-white/52">Blocked</div>
              <div className="mt-1 text-[24px] font-semibold">1</div>
            </div>
            <div className="rounded-[22px] bg-white/8 p-3">
              <div className="text-[11px] text-white/52">Needs handoff</div>
              <div className="mt-1 text-[24px] font-semibold">1</div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-5 text-white/65">The dashboard keeps the current truth visible without forcing people back into chat threads.</p>
        </div>

        <Section title="Urgent tasks" count={2}>
          {taskState.urgent.map((task) => (
            <TaskCard key={task.id} task={task} onOpen={() => onOpenScreen(task.id === 1 ? "claim" : "task-detail")} />
          ))}
        </Section>

        <Section title="Blocked" count={1}>
          {taskState.blocked.map((task) => (
            <TaskCard key={task.id} task={task} onOpen={() => onOpenScreen("blocked")} compact />
          ))}
        </Section>

        <Section title="Needs reassignment" count={1}>
          {taskState.reassign.map((task) => (
            <TaskCard key={task.id} task={task} onOpen={() => onOpenScreen("reassign")} compact />
          ))}
        </Section>

        <Section title="Completed today" count={1}>
          {taskState.done.map((task) => (
            <TaskCard key={task.id} task={task} onOpen={() => onOpenScreen("success")} compact />
          ))}
        </Section>
      </div>
    </Shell>
  );
}

function DetailRow({ icon: Icon, label, value, strong = false }) {
  return (
    <div className="flex items-start gap-3 rounded-[20px] bg-slate-50 p-3">
      <div className="rounded-2xl bg-white p-2.5 shadow-sm"><Icon size={16} className="text-slate-700" /></div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-400">{label}</div>
        <div className={cn("mt-1 text-[14px] leading-5", strong ? "font-semibold text-slate-900" : "text-slate-600")}>{value}</div>
      </div>
    </div>
  );
}

function TaskDetailScreen({ onOpenScreen, onBack }) {
  return (
    <Shell>
      <StatusBar />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-2">
        <div className="mt-2 flex items-center justify-between">
          <button onClick={onBack} className="rounded-full bg-white p-3 shadow-sm"><ArrowLeft size={18} className="text-slate-700" /></button>
          <div className="text-[13px] font-medium text-slate-500">Task detail</div>
          <button className="rounded-full bg-white p-3 shadow-sm"><MoreHorizontal size={18} className="text-slate-700" /></button>
        </div>

        <div className="mt-5 rounded-[30px] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[29px] font-semibold tracking-[-0.04em] text-slate-900">Confirm catering</div>
              <div className="mt-2 text-[14px] leading-6 text-slate-500">A final confirmation is still needed before tonight so the order can be locked in.</div>
            </div>
            <StatePill state="Unclaimed" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <DetailRow icon={User} label="Owner" value="Unclaimed" strong />
            <DetailRow icon={Calendar} label="Deadline" value="Mar 18" strong />
            <DetailRow icon={Flag} label="Why urgent" value="Due soon" />
            <DetailRow icon={ClipboardList} label="Event" value={eventName} />
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
          <TopHeader title="Context" subtitle="The latest confirmed details are placed high so nobody has to reconstruct them from chat." />
          <div className="mt-4 space-y-3">
            <DetailRow icon={AlertCircle} label="Dependencies" value="Budget confirmed, venue still pending" />
            <DetailRow icon={LinkIcon} label="Linked resources" value="Catering quote, budget sheet" />
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="mb-3 text-[15px] font-semibold text-slate-900">Status history</div>
          <div className="space-y-3 text-[13px] text-slate-500">
            <div className="rounded-[20px] bg-slate-50 p-3">Mar 16 • Task created from group chat summary</div>
            <div className="rounded-[20px] bg-slate-50 p-3">Mar 17 • Headcount updated to 120</div>
            <div className="rounded-[20px] bg-slate-50 p-3">Mar 17 • Venue confirmation still pending</div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={() => onOpenScreen("claim")} className="flex-1 rounded-[24px] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_16px_32px_rgba(58,118,240,0.25)]" style={{ backgroundColor: palette.blue }}>Claim task</button>
          <button className="rounded-[24px] border border-slate-200 bg-white px-5 py-4 text-[15px] font-medium text-slate-700">Edit</button>
        </div>
      </div>
    </Shell>
  );
}

function ClaimFlowScreen({ onOpenScreen, onBack }) {
  return (
    <Shell>
      <StatusBar />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-2">
        <div className="mt-2 flex items-center justify-between">
          <button onClick={onBack} className="rounded-full bg-white p-3 shadow-sm"><ArrowLeft size={18} className="text-slate-700" /></button>
          <div className="text-[13px] font-medium text-slate-500">Claim task</div>
          <div className="w-12" />
        </div>

        <div className="mt-5 rounded-[30px] bg-white p-5 shadow-sm">
          <div className="text-[12px] uppercase tracking-[0.16em] text-slate-400">Step 1</div>
          <div className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-slate-900">Claim “Confirm catering”</div>
          <p className="mt-2 text-[14px] leading-6 text-slate-500">This makes ownership explicit and updates both Dashboard and My Tasks right away.</p>
          <div className="mt-5 rounded-[24px] bg-slate-50 p-4">
            <div className="text-[12px] text-slate-500">Current owner</div>
            <div className="mt-1 text-[17px] font-semibold text-slate-900">Unclaimed</div>
          </div>
          <div className="mt-4 rounded-[24px] bg-blue-50 p-4 text-blue-900">
            <div className="text-[13px] font-medium">Team-visible update</div>
            <p className="mt-1 text-[14px] leading-6 text-blue-800/80">Once claimed, everyone sees the new owner without needing a follow-up message.</p>
          </div>
        </div>

        <div className="mt-4 rounded-[30px] p-5 text-white shadow-[0_22px_50px_rgba(20,38,64,0.22)]" style={{ backgroundColor: palette.navy }}>
          <div className="mb-2 flex items-center gap-2 text-white/70"><Sparkles size={15} /><span className="text-[12px] uppercase tracking-[0.16em]">Confirmation preview</span></div>
          <div className="text-[22px] font-semibold tracking-[-0.03em]">Task claimed</div>
          <p className="mt-2 text-[14px] leading-6 text-white/65">Confirm catering now belongs to you and appears in your task list as In Progress.</p>
        </div>

        <button onClick={() => onOpenScreen("success")} className="mt-5 w-full rounded-[24px] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_16px_32px_rgba(58,118,240,0.25)]" style={{ backgroundColor: palette.blue }}>Confirm claim</button>
      </div>
    </Shell>
  );
}

function MyTasksScreen({ onOpenScreen, onTabChange }) {
  const [sort, setSort] = useState("Urgency");
  return (
    <Shell activeTab="my-tasks" onTabChange={onTabChange}>
      <StatusBar />
      <div className="h-full overflow-y-auto px-6 pb-28 pt-2">
        <TopHeader
          title="My tasks"
          subtitle="A focused view for quick updates between classes or while commuting."
          right={<button className="rounded-full bg-white p-3 shadow-sm"><ClipboardList size={18} className="text-slate-700" /></button>}
        />

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          {['Urgency','Deadline'].map((item) => (
            <button
              key={item}
              onClick={() => setSort(item)}
              className={cn("rounded-full px-4 py-2.5 text-[13px] font-medium whitespace-nowrap", sort === item ? "text-white" : "bg-white text-slate-500 shadow-sm")}
              style={sort === item ? { backgroundColor: palette.navy } : undefined}
            >
              Sort: {item}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          {taskState.myTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpen={() => onOpenScreen(task.status === 'Needs Reassignment' ? 'reassign' : 'task-detail')}
              actions={
                <>
                  <button onClick={() => onOpenScreen('success')} className="rounded-full bg-emerald-50 px-4 py-2 text-[12px] font-semibold text-emerald-700">Mark done</button>
                  <button onClick={() => onOpenScreen('blocked')} className="rounded-full bg-rose-50 px-4 py-2 text-[12px] font-semibold text-rose-700">Mark blocked</button>
                  <button onClick={() => onOpenScreen('reassign')} className="rounded-full bg-violet-50 px-4 py-2 text-[12px] font-semibold text-violet-700">Request reassignment</button>
                </>
              }
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}

function Field({ label, placeholder, value }) {
  return (
    <div>
      <div className="mb-2 text-[12px] font-medium text-slate-500">{label}</div>
      <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-[15px] text-slate-900">{value || placeholder}</div>
    </div>
  );
}

function BlockedFlowScreen({ onOpenScreen, onBack }) {
  return (
    <Shell>
      <StatusBar />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-2">
        <div className="mt-2 flex items-center justify-between">
          <button onClick={onBack} className="rounded-full bg-white p-3 shadow-sm"><ArrowLeft size={18} className="text-slate-700" /></button>
          <div className="text-[13px] font-medium text-slate-500">Blocked flow</div>
          <div className="w-12" />
        </div>

        <div className="mt-5 rounded-[30px] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-[20px] bg-rose-50 p-3 text-rose-700"><ShieldAlert size={18} /></div>
            <div>
              <div className="text-[24px] font-semibold tracking-[-0.03em] text-slate-900">Mark task blocked</div>
              <div className="text-[14px] text-slate-500">Blocked tasks stay visible instead of disappearing into chat.</div>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <Field label="Task" value="Design poster" />
            <Field label="Why is this blocked?" value="Still waiting on venue confirmation" />
            <Field label="Next step" value="Venue lead confirms room by tonight, then design can continue" />
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="text-[15px] font-semibold text-slate-900">What the team will see</div>
          <div className="mt-3 rounded-[24px] bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[16px] font-semibold text-slate-900">Design poster</div>
                <div className="mt-1 text-[13px] text-slate-500">Owner: You • Reason: waiting on venue</div>
              </div>
              <StatePill state="Blocked" />
            </div>
          </div>
        </div>

        <button onClick={() => onOpenScreen('success')} className="mt-5 w-full rounded-[24px] px-5 py-4 text-[15px] font-semibold text-white" style={{ backgroundColor: palette.red }}>Save blocked status</button>
      </div>
    </Shell>
  );
}

function ReassignFlowScreen({ onOpenScreen, onBack }) {
  return (
    <Shell>
      <StatusBar />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-2">
        <div className="mt-2 flex items-center justify-between">
          <button onClick={onBack} className="rounded-full bg-white p-3 shadow-sm"><ArrowLeft size={18} className="text-slate-700" /></button>
          <div className="text-[13px] font-medium text-slate-500">Reassignment</div>
          <div className="w-12" />
        </div>

        <div className="mt-5 rounded-[30px] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-[20px] bg-violet-50 p-3 text-violet-700"><Shuffle size={18} /></div>
            <div>
              <div className="text-[24px] font-semibold tracking-[-0.03em] text-slate-900">Request reassignment</div>
              <div className="text-[14px] text-slate-500">A handoff note keeps progress from getting lost.</div>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <Field label="Task" value="Social media caption" />
            <Field label="What’s already done" value="Draft is written and sponsor hashtags are added" />
            <Field label="What remains" value="Need final sponsor logo and approval before posting" />
            <Field label="Relevant links" value="Caption draft, sponsor brief" />
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-violet-50 p-5 text-violet-900">
          <div className="text-[13px] font-medium">Clear handoff state</div>
          <p className="mt-1 text-[14px] leading-6 text-violet-900/80">Once submitted, the task moves into Needs Reassignment so the team knows it still exists and what the next owner needs.</p>
        </div>

        <button onClick={() => onOpenScreen('success')} className="mt-5 w-full rounded-[24px] px-5 py-4 text-[15px] font-semibold text-white" style={{ backgroundColor: palette.violet }}>Send handoff</button>
      </div>
    </Shell>
  );
}

function CreateTaskScreen({ onOpenScreen, onTabChange }) {
  return (
    <Shell activeTab="create" onTabChange={onTabChange}>
      <StatusBar />
      <div className="h-full overflow-y-auto px-6 pb-28 pt-2">
        <TopHeader
          title="Create task"
          subtitle="Structured creation replaces informal task messages and makes expectations explicit."
          right={<button className="rounded-full bg-white p-3 shadow-sm"><CirclePlus size={18} className="text-slate-700" /></button>}
        />

        <div className="mt-5 rounded-[30px] bg-white p-5 shadow-sm">
          <div className="space-y-4">
            <Field label="Task name" value="Buy snacks" />
            <Field label="Assign to" value="Unassigned" />
            <Field label="Deadline" value="Mar 17" />
            <Field label="Description" value="Pick up snacks for registration desk before 5 PM" />
          </div>
        </div>

        <div className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
          <div className="text-[15px] font-semibold text-slate-900">Preview on dashboard</div>
          <div className="mt-3 rounded-[24px] bg-slate-50 p-4">
            <div className="text-[16px] font-semibold text-slate-900">Buy snacks</div>
            <div className="mt-1 text-[13px] text-slate-500">Owner: Unassigned • Due Mar 17</div>
            <div className="mt-3 flex items-center gap-2">
              <StatePill state="Unclaimed" />
              <Badge tone="due">Due soon</Badge>
            </div>
          </div>
        </div>

        <button onClick={() => onOpenScreen('success')} className="mt-5 w-full rounded-[24px] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_16px_32px_rgba(20,38,64,0.20)]" style={{ backgroundColor: palette.navy }}>Create task</button>
      </div>
    </Shell>
  );
}

function SuccessScreen({ onBackHome }) {
  return (
    <Shell>
      <StatusBar />
      <div className="flex h-full flex-col px-6 pb-10 pt-10">
        <div className="mx-auto mt-10 flex h-24 w-24 items-center justify-center rounded-[30px] bg-emerald-50 text-emerald-600 shadow-sm">
          <CheckCircle size={42} />
        </div>
        <div className="mt-8 text-center text-[30px] font-semibold tracking-[-0.04em] text-slate-900">Update sent to the team</div>
        <p className="mx-auto mt-3 max-w-[290px] text-center text-[15px] leading-6 text-slate-500">The state change is explicit and visible across Dashboard and My Tasks, so nobody has to wonder if it actually updated.</p>

        <div className="mt-8 space-y-3">
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <div className="text-[12px] uppercase tracking-[0.16em] text-slate-400">What changed</div>
            <div className="mt-2 text-[16px] font-semibold text-slate-900">Task status updated</div>
            <div className="mt-1 text-[13px] text-slate-500">Claim, done, blocked, reassignment, and create actions all return visible feedback here.</div>
          </div>
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <div className="text-[12px] uppercase tracking-[0.16em] text-slate-400">Why this matters</div>
            <div className="mt-2 text-[13px] leading-6 text-slate-500">The team gets confidence that ownership and status changed in the shared system, not just on one person’s screen.</div>
          </div>
        </div>

        <button onClick={onBackHome} className="mt-auto w-full rounded-[24px] px-5 py-4 text-[15px] font-semibold text-white" style={{ backgroundColor: palette.navy }}>Return to dashboard</button>
      </div>
    </Shell>
  );
}

export default function UnfinishedHiFiPrototype() {
  const [screen, setScreen] = useState("dashboard");
  const [lastMain, setLastMain] = useState("dashboard");

  const openScreen = (next) => {
    if (["dashboard", "my-tasks", "create"].includes(next)) setLastMain(next);
    setScreen(next);
  };

  const backToMain = () => setScreen(lastMain);

  const rendered = useMemo(() => {
    switch (screen) {
      case "task-detail":
        return <TaskDetailScreen onOpenScreen={openScreen} onBack={backToMain} />;
      case "claim":
        return <ClaimFlowScreen onOpenScreen={openScreen} onBack={backToMain} />;
      case "my-tasks":
        return <MyTasksScreen onOpenScreen={openScreen} onTabChange={openScreen} />;
      case "blocked":
        return <BlockedFlowScreen onOpenScreen={openScreen} onBack={backToMain} />;
      case "reassign":
        return <ReassignFlowScreen onOpenScreen={openScreen} onBack={backToMain} />;
      case "create":
        return <CreateTaskScreen onOpenScreen={openScreen} onTabChange={openScreen} />;
      case "success":
        return <SuccessScreen onBackHome={() => openScreen("dashboard")} />;
      case "dashboard":
      default:
        return <DashboardScreen onOpenScreen={openScreen} onTabChange={openScreen} />;
    }
  }, [screen]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(58,118,240,0.10),transparent_34%),linear-gradient(180deg,#f8fafc_0%,#edf2f7_100%)] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[13px] font-medium uppercase tracking-[0.18em] text-slate-400">Unfinished hi-fi prototype</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">Event task visibility on mobile</h1>
            <p className="mt-2 max-w-2xl text-[15px] leading-6 text-slate-500">Preview the main interaction flows from the low-fi: dashboard scanning, claiming, task detail, blocked recovery, reassignment handoff, and task creation.</p>
          </div>
          <div className="rounded-[24px] border border-white/70 bg-white/85 p-2 shadow-sm backdrop-blur">
            <div className="flex flex-wrap gap-2">
              {screens.map((item) => (
                <button
                  key={item.key}
                  onClick={() => openScreen(item.key)}
                  className={cn("rounded-full px-3 py-2 text-[12px] font-medium transition-all", screen === item.key ? "text-white" : "bg-slate-100 text-slate-600")}
                  style={screen === item.key ? { backgroundColor: palette.navy } : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">{rendered}</div>
      </div>
    </div>
  );
}
