import { useState } from "react";
import {
  Button,
  Card,
  Collapse,
  Descriptions,
  Segmented,
  Space,
  Tag,
  Timeline,
  Typography,
} from "antd";
import { profile, skills, jobs, projects } from "./data";

function Heading({ number, title, english }) {
  return (
    <div className="section-heading">
      <span>{number}</span>
      <h2>{title}</h2>
      <span>{english}</span>
    </div>
  );
}
function Points({ items }) {
  return (
    <ul className="details">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const [filter, setFilter] = useState("全部");
  const [openProjects, setOpenProjects] = useState(["Ivy App"]);
  const visibleProjects = projects.filter(
    (project) =>
      filter === "全部" ||
      (filter === "App / 多端"
        ? ["Ivy App", "财富粮仓 App"].includes(project.name)
        : filter === "业务系统"
          ? ["SMP 管理系统", "智慧体检"].includes(project.name)
          : project.name === "Gm 食安评价"),
  );
  return (
    <>
      <header>
        <div className="nav">
          <a className="brand" href="#home">
            LX<b>Y.</b> <small> / 简历</small>
          </a>
          <nav aria-label="页面导航">
            <a href="#about">关于</a>
            <a href="#experience">经历</a>
            <a href="#projects">项目</a>
            <a href="#contact">联系</a>
          </nav>
        </div>
      </header>
      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">FRONTEND DEVELOPER / SHENZHEN</p>
            <h1 id="hero-title">你好</h1>
            <h1>
              我是李旭阳。<span>用代码，连接产品与体验。</span>
            </h1>
            <p className="intro">{profile.intro}</p>
            <Space wrap>
              <Tag color="green">{profile.experience}</Tag>
              <Tag>Vue / uni-app</Tag>
              <Tag>AI 应用与硬件交互</Tag>
            </Space>
            <Space className="actions" wrap>
              <Button type="primary" size="large" href="#projects">
                探索项目 ↓
              </Button>
              <Button size="large" href={`mailto:${profile.email}`}>
                联系我 ↗
              </Button>
            </Space>
          </div>
          <div className="profile-art" aria-label="李旭阳姓名缩写装饰">
            <div className="monogram">LXY</div>
            <div className="art-caption">BUILD · CONNECT · REFINE</div>
            <div className="art-label">◈ 前端开发 / 多端实践</div>
          </div>
        </section>
        <section className="section overview" id="about">
          <div>
            <Heading number="01" title="关于我" english="ABOUT" />
            <p>扎根业务，也关注每一次交互。</p>
          </div>
          <div>
            <p>{profile.about}</p>
            <Descriptions
              column={{ xs: 1, sm: 2 }}
              size="small"
              items={[
                { key: "role", label: "求职方向", children: profile.role },
                { key: "city", label: "期望城市", children: profile.city },
                { key: "salary", label: "期望薪资", children: profile.salary },
                {
                  key: "degree",
                  label: "学历专业",
                  children: "本科 · 计算机科学与技术",
                },
              ]}
            />
          </div>
        </section>
        <section className="section" id="skills">
          <Heading number="02" title="技术与能力" english="CAPABILITIES" />
          <div className="skills">
            {skills.map((skill) => (
              <Card key={skill.title} className="skill-card">
                <h3>{skill.title}</h3>
                <Space wrap size={[4, 0]}>
                  {skill.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
                <p>{skill.text}</p>
              </Card>
            ))}
          </div>
        </section>
        <section className="section" id="experience">
          <Heading number="03" title="工作经历" english="EXPERIENCE" />
          <Timeline
            items={jobs.map((job) => ({
              color: "#176c55",
              content: (
                <div>
                  <div className="timeline-title">
                    <strong>{job.company}</strong>
                    <time>{job.date}</time>
                  </div>
                  <p className="role">{job.role}</p>
                  <Points items={job.points} />
                </div>
              ),
            }))}
          />
        </section>
        <section className="section" id="projects">
          <Heading number="04" title="精选项目" english="SELECTED WORK" />
          <Space wrap style={{ marginBottom: 24 }}>
            <Segmented
              aria-label="项目类型筛选"
              options={["全部", "App / 多端", "业务系统", "小程序"]}
              value={filter}
              onChange={setFilter}
            />
            <Typography.Text type="secondary">
              {visibleProjects.length} 个项目
            </Typography.Text>
            <Button
              type="text"
              onClick={() =>
                setOpenProjects(visibleProjects.map((project) => project.name))
              }
            >
              全部展开
            </Button>
          </Space>
          <Collapse
            activeKey={openProjects}
            onChange={setOpenProjects}
            ghost
            items={visibleProjects.map((project) => ({
              key: project.name,
              forceRender: true,
              label: (
                <div className="project-label">
                  <span className="project-number">
                    0{projects.indexOf(project) + 1}
                  </span>
                  <span className="project-name">{project.name}</span>
                  <Tag>{project.category}</Tag>
                </div>
              ),
              children: (
                <div className="project-summary">
                  <Typography.Text type="secondary">
                    {project.period}
                  </Typography.Text>
                  <p className="description">{project.summary}</p>
                  <Space wrap size={[4, 0]}>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                  <Points items={project.points} />
                </div>
              ),
            }))}
          />
        </section>
        <section className="section" id="education">
          <Heading number="05" title="教育背景" english="EDUCATION" />
          <div className="timeline-title">
            <strong>桂林电子科技大学信息科技学院</strong>
            <time>2016 — 2020</time>
          </div>
          <p className="role">本科 · 计算机科学与技术</p>
          <p className="description">
            校园优秀学生奖学金 · 广西英语翻译大赛优秀奖
          </p>
          <Space wrap>
            <Tag>计算机一级</Tag>
            <Tag>普通话二级甲等</Tag>
            <Tag>NCIE 全国信息化工程师项目证书</Tag>
          </Space>
        </section>
        <section className="section" id="contact">
          <div className="contact-panel">
            <div>
              <p className="eyebrow">LET’S BUILD SOMETHING</p>
              <h2>期待下一次合作。</h2>
              <p>
                如果你正在寻找一位关注产品体验、擅长多端交付的前端开发工程师，欢迎联系。
              </p>
              <Space wrap>
                <Button type="primary" href={`mailto:${profile.email}`}>
                  发送邮件 ↗
                </Button>
                <Button onClick={() => window.print()}>打印网页</Button>
              </Space>
            </div>
            <div className="contact-values">
              <Typography.Text type="secondary">
                EMAIL / 联系邮箱
              </Typography.Text>
              <Typography.Text copyable={{ text: profile.email }}>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </Typography.Text>
              <Typography.Text type="secondary">
                LOCATION / 深圳
              </Typography.Text>
            </div>
          </div>
        </section>
        <footer>
          <span>© 李旭阳 · 前端开发工程师</span>
          <span>React + Ant Design · 内容依据个人简历整理</span>
          <a href="#home">回到顶部 ↑</a>
        </footer>
      </main>
    </>
  );
}
