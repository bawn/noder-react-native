//
//  LCULDisplayNode.h
//  Test
//
//  Created by bawn on 29/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import <AsyncDisplayKit/AsyncDisplayKit.h>

@class HTMLNode;

@interface LCULDisplayNode : ASDisplayNode

- (instancetype)initWithContent:(HTMLNode *)HTMLNode delegate:(id<ASTextNodeDelegate>)delegate;

@end
