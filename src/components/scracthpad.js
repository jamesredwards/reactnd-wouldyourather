      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            <Switch>
              {this.props.loading === true
                ? <Route path="/" exact component={Login} />
                : <div>
                  <Route path="/" exact component={Home} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route path="/newquestion" component={NewQuestion} />
                </div>
              }
            </Switch>
          </div>
        </Fragment>
      </Router>